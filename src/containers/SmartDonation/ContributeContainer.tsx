import { Client, UserAccount } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { ActionMap, Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { OneSmartContract, SmartDonationSmartContract, WithContracts } from '../../../one/generated';

interface Actions {
  readonly onChangeContributeAmount: (amountText: string) => void;
  readonly onChangeMessage: (message: string) => void;
}

const onChangeAmount = (text: string) => {
  let amount: BigNumber | undefined;
  try {
    amount = new BigNumber(text);
    if (amount.toString() !== text) {
      amount = undefined;
    }
  } catch {
    // do nothing
  }

  return amount;
};

const onChangeMessage = (text: string) => {
  if (text.length > 200) {
    return undefined;
  }

  return text;
};

const actions: ActionMap<State, Actions> = {
  onChangeContributeAmount: (amountText: string) => () => {
    const amount = onChangeAmount(amountText);

    return { amountText, amount };
  },
  onChangeMessage: (message: string) => () => ({
    message: onChangeMessage(message),
  }),
};

interface Effects {
  readonly contribute: () => void;
}

interface State {
  readonly contributeLoading: boolean;
  readonly message: string;
  readonly amountText: string;
  readonly amount: BigNumber | undefined;
}

const makeEffects = (
  client: Client,
  one: OneSmartContract,
  smartDonation: SmartDonationSmartContract,
  toWallet: UserAccount | undefined,
): EffectMap<State, Effects> => ({
  contribute: () => ({
    state: { amount, message },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    const network = client.getCurrentNetwork();
    const account = client.getCurrentUserAccount();
    if (account === undefined || toWallet === undefined) {
      return;
    }

    setState({ contributeLoading: true });

    const onComplete = (clear: boolean) => {
      if (clear) {
        setState({ contributeLoading: false, amountText: '', message: '', amount: undefined });
      } else {
        setState({ contributeLoading: false });
      }
    };

    const onError = (_error: Error) => {
      onComplete(false);
    };

    if (amount === undefined) {
      if (message === '') {
        return;
      }

      smartDonation.updateContributorMessage
        .confirmed(toWallet.id.address, account.id.address, message)
        .then((receipt) => {
          if (receipt.result.state === 'FAULT') {
            throw new Error(receipt.result.message);
          }
          if (!receipt.result.value) {
            throw new Error("You haven't contributed to set a message!");
          }
          onComplete(true);
        })
        .catch(onError);

      return;
    }

    one.transfer
      .confirmed(
        account.id.address,
        smartDonation.definition.networks[network].address,
        amount,
        ...smartDonation.forwardApproveReceiveTransferArgs(toWallet.id.address, message),
      )
      .then((receipt) => {
        if (receipt.result.state === 'FAULT') {
          throw new Error(receipt.result.message);
        }
        if (!receipt.result.value) {
          throw new Error('Unable to complete transfer. Not enough balance.');
        }
        onComplete(true);
      })
      .catch(onError);
  },
});

interface Props extends ContainerProps<State, Actions, {}, Effects> {
  readonly toWallet: UserAccount | undefined;
}

export const ContributeContainer = (props: Props) => (
  <WithContracts>
    {({ client, one, smartDonation }) => {
      const effects = makeEffects(client, one, smartDonation, props.toWallet);

      return (
        <Container
          {...props}
          initialState={{
            contributeLoading: false,
            message: '',
            amountText: '',
          }}
          actions={actions}
          effects={effects}
        />
      );
    }}
  </WithContracts>
);
