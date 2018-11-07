import { Client, UserAccount } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { ActionMap, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { Container } from 'reakit';
import { EscrowSmartContract, OneSmartContract, WithContracts } from '../../one/generated';

interface Actions {
  readonly onChangeSendAmount: (sendText: string) => void;
  readonly onChangeReceiveAmount: (receiveText: string) => void;
  readonly onChangeRevokeAmount: (revokeText: string) => void;
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

const actions: ActionMap<State, Actions> = {
  onChangeSendAmount: (sendText: string) => () => {
    const sendAmount = onChangeAmount(sendText);

    return { sendText, sendAmount };
  },
  onChangeReceiveAmount: (receiveText: string) => () => {
    const receiveAmount = onChangeAmount(receiveText);

    return { receiveText, receiveAmount };
  },
  onChangeRevokeAmount: (revokeText: string) => () => {
    const revokeAmount = onChangeAmount(revokeText);

    return { revokeText, revokeAmount };
  },
};

interface Effects {
  readonly send: () => void;
  readonly receive: () => void;
  readonly revoke: () => void;
}

const makeEffects = (
  client: Client,
  escrow: EscrowSmartContract,
  one: OneSmartContract,
  toWallet: UserAccount | undefined,
): EffectMap<State, Effects> => ({
  send: () => ({ state: { sendAmount }, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const network = client.getCurrentNetwork();
    const from = client.getCurrentUserAccount();

    if (sendAmount === undefined || from === undefined || toWallet === undefined) {
      return;
    }

    setState({ sendLoading: true });

    const onComplete = (clear: boolean) => {
      if (clear) {
        setState({ sendLoading: false, sendText: '', sendAmount: undefined });
      } else {
        setState({ sendLoading: false });
      }
    };

    const onError = (_error: Error) => {
      onComplete(false);
    };

    one.transfer
      .confirmed(
        from.id.address,
        escrow.definition.networks[network].address,
        sendAmount,
        ...escrow.forwardApproveReceiveTransferArgs(toWallet.id.address),
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
  receive: () => ({
    state: { receiveAmount },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    const from = client.getCurrentUserAccount();

    if (from === undefined || toWallet === undefined) {
      return;
    }

    setState({ receiveLoading: true });

    const onComplete = (clear: boolean) => {
      if (clear) {
        setState({ receiveLoading: false, receiveText: '', receiveAmount: undefined });
      } else {
        setState({ receiveLoading: false });
      }
    };

    const onError = (_error: Error) => {
      onComplete(false);
    };

    return escrow
      .balanceOf(from.id.address, toWallet.id.address)
      .then(async (balance) =>
        escrow.receiveONE
          .confirmed(from.id.address, toWallet.id.address, receiveAmount === undefined ? balance : receiveAmount, {
            from: toWallet.id,
          })
          .then((receipt) => {
            if (receipt.result.state === 'FAULT') {
              throw new Error(receipt.result.message);
            }
            if (!receipt.result.value) {
              throw new Error('Unable to complete transfer. Not enough balance.');
            }

            onComplete(true);
          }),
      )
      .catch(onError);
  },
  revoke: () => ({
    state: { revokeAmount },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    const from = client.getCurrentUserAccount();

    if (from === undefined || toWallet === undefined) {
      return;
    }

    setState({ revokeLoading: true });

    const onComplete = (clear: boolean) => {
      if (clear) {
        setState({ revokeLoading: false, revokeText: '', revokeAmount: undefined });
      } else {
        setState({ revokeLoading: false });
      }
    };

    const onError = (_error: Error) => {
      onComplete(false);
    };

    return escrow
      .balanceOf(from.id.address, toWallet.id.address)
      .then(async (balance) =>
        escrow.revokeONE
          .confirmed(from.id.address, toWallet.id.address, revokeAmount === undefined ? balance : revokeAmount, {
            from: from.id,
          })
          .then((receipt) => {
            if (receipt.result.state === 'FAULT') {
              throw new Error(receipt.result.message);
            }
            if (!receipt.result.value) {
              throw new Error('Unable to complete transfer. Not enough balance.');
            }

            onComplete(true);
          }),
      )
      .catch(onError);
  },
});

interface State {
  readonly sendText: string;
  readonly receiveText: string;
  readonly revokeText: string;
  readonly sendAmount: BigNumber | undefined;
  readonly receiveAmount: BigNumber | undefined;
  readonly revokeAmount: BigNumber | undefined;
  readonly sendLoading: boolean;
  readonly receiveLoading: boolean;
  readonly revokeLoading: boolean;
}

interface Props extends ContainerProps<State, Actions, {}, Effects> {
  readonly toWallet: UserAccount | undefined;
}

export const EscrowContainer = (props: Props) => (
  <WithContracts>
    {({ client, escrow, one }) => {
      const effects = makeEffects(client, escrow, one, props.toWallet);

      return (
        <Container
          {...props}
          initialState={{
            sendText: '',
            receiveText: '',
            sendLoading: false,
            receiveLoading: false,
            revokeLoading: false,
          }}
          actions={actions}
          effects={effects}
        />
      );
    }}
  </WithContracts>
);
