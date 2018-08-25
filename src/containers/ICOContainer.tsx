import { Client, Hash256, TransactionResult } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { ActionMap, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { Container } from 'reakit';
import { ICOSmartContract, WithContracts } from '../../one/generated';

interface Actions {
  readonly onChangeAmount: (text: string) => void;
}

const actions: ActionMap<State, Actions> = {
  // tslint:disable-next-line no-any
  onChangeAmount: (text: string) => () => {
    let amount: BigNumber | undefined;
    try {
      amount = new BigNumber(text);
      if (amount.toString() !== text) {
        amount = undefined;
      }
    } catch {
      // do nothing
    }

    return { text, amount };
  },
};

interface Effects {
  readonly send: () => void;
}

const makeEffects = (client: Client, ico: ICOSmartContract): EffectMap<State, Effects> => ({
  send: () => ({ state: { amount }, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const from = client.getCurrentAccount();
    if (amount === undefined || from === undefined) {
      return;
    }

    setState({ loading: true });

    const onComplete = (clear: boolean) => () => {
      if (clear) {
        setState({ loading: false, text: '' });
      } else {
        setState({ loading: false });
      }
    };

    const onError = (error: Error) => {
      // tslint:disable-next-line no-console
      console.error(error);
      onComplete(false)();
    };

    const toConfirm = (result: TransactionResult) => {
      result
        .confirmed()
        .then(onComplete(true))
        .catch(onError);
    };

    ico
      .mintTokens({
        transfers: [
          {
            to: ico.definition.networks[from.id.network].address,
            asset: Hash256.NEO,
            // tslint:disable-next-line no-non-null-assertion
            amount,
          },
        ],
      })
      .then(toConfirm)
      .catch(onError);
  },
});

interface State {
  readonly text: string;
  readonly amount: BigNumber | undefined;
  readonly loading: boolean;
}

export const ICOContainer = (props: ContainerProps<State, Actions, {}, Effects>) => (
  <WithContracts>
    {({ client, ico }) => {
      const effects = makeEffects(client, ico);

      return <Container {...props} initialState={{ text: '', loading: false }} actions={actions} effects={effects} />;
    }}
  </WithContracts>
);
