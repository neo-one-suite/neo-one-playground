import { Client, Hash256, TransactionResult } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { ActionMap, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { Container } from 'reakit';
import { SlotsSmartContract, WithContracts } from '../../one/generated';

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
  readonly spin: (wager: number, address: string) => void;
}

const makeEffects = (client: Client, slots: SlotsSmartContract): EffectMap<State, Effects> => ({
  spin: (wager) => async ({
    state: { amount },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    const spins = await Promise.all([slots.spin(wager, address)]);
    setState({ digits: spins });
  },

  send: () => ({ state: { amount }, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const from = client.getCurrentAccount();
    if (amount === undefined || from === undefined) {
      return;
    }

    setState({ loading: true });

    const onComplete = (clear: boolean) => () => {
      if (clear) {
        setState({ loading: false, text: '', amount: undefined });
      } else {
        setState({ loading: false });
      }
    };

    const onError = () => {
      onComplete(false)();
    };

    const toConfirm = (result: TransactionResult) => {
      result
        .confirmed()
        .then(onComplete(true))
        .catch(onError);
    };

    slots
      .mintTokens({
        sendTo: [
          {
            asset: Hash256.NEO,
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
  readonly digits: ReadonlyArray<BigNumber>;
}

export const SlotsContainer = (props: ContainerProps<State, Actions, {}, Effects>) => (
  <WithContracts>
    {({ client, slots }) => {
      const effects = makeEffects(client, slots);

      return <Container {...props} initialState={{ text: '', loading: false }} actions={actions} effects={effects} />;
    }}
  </WithContracts>
);
