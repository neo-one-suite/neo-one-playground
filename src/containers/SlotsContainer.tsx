import { Client, Hash256, TransactionResult } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { ActionMap, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { Container } from 'reakit';
import { SlotsSmartContract, WithContracts } from '../../one/generated';

/* COMPONENT
     LAYOUT
     STATE
     ACTIONS
*/

interface Actions {
  readonly onChangeAmount: (text: string) => void;
  readonly spin: (state: State) => void;
}

interface State {
  readonly text: string;
  readonly amount: BigNumber | undefined;
  readonly loading: boolean;
  readonly results: BigNumber[];
  readonly address: string;
  readonly offset: number;
  readonly winner: boolean;
  readonly winnings: number;
  readonly spinning: boolean;
  readonly spinsStart: number[];
  readonly spinsPosition: number[];
}

const actions: ActionMap<State, Actions> = {
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
  spin: ({ amount }) => () => {
    console.log(' Spin on Actions: ' + amount);
    return { amount };
  },
};

interface Effects {
  readonly spin: (wager: BigNumber, address: string) => void;
}

const makeEffects = (client: Client, slots: SlotsSmartContract): EffectMap<State, Effects> => ({
  spin: (wager, address) => ({
    state: { amount },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    console.log(' Starting Spin ');
    setState({ spinning: true });
    setState({ results: [new BigNumber('30000'), new BigNumber('30000'), new BigNumber('30000')] });

    const WINNING = -2;
    const slotWindowsQty = new BigNumber('3');

    slots
      .spin(wager, slotWindowsQty, 'APyEx5f4Zm4oCHwFWiSTaph1fPBxZacYVR')
      .then(([winner, winAmount, ...spins]) => {
        console.log(' FINISHED THE SPIN ');
        const offset = Math.floor(Math.random() * 100);

        console.log(' Offset: ' + offset);
        setState({
          winner: winner.toNumber() == WINNING ? true : false,
          results: spins,
          spinning: false,
          offset,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
export const SlotsContainer = (props: ContainerProps<State, Actions, {}, Effects>) => (
  <WithContracts>
    {({ client, slots }) => {
      const effects = makeEffects(client, slots);
      return (
        <Container
          {...props}
          initialState={{ text: '', results: [], loading: false }}
          actions={actions}
          effects={effects}
        />
      );
    }}
  </WithContracts>
);
