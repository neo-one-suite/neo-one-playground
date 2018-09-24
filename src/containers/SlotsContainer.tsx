import { UserAccount } from '@neo-one/client';
import { WalletSelectorOptionType } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import { Client } from '@neo-one/client';
import { ContainerProps, EffectMap } from 'constate';
import React, { MouseEvent, ReactNode, SFC } from 'react';
import { Container } from 'reakit';
import { SpinnerProps } from '../components/slots/Spinner';
import { SlotsSmartContract, WithContracts } from '../../one/generated';

export enum TSpinnerState {
  ERROR,
  RESTING,
  SPINNING,
  SETTLING,
}

const WHEEL_COUNT = 3;
const WINNER_DEF = -2;
const WAGER = 1;

const slotStateSpinning = { spinnerState: TSpinnerState.SPINNING };
const slotStateSettling = { spinnerState: TSpinnerState.SETTLING };
const slotStateResting = { spinnerState: TSpinnerState.RESTING };
const spinFailed = {
  isWinner: false,
  amount: 0,
  results: [...Array().keys()].map(() => -1),
};

interface State {
  //  readonly fromWallet: UserAccount | undefined;
  readonly isWinner: boolean;
  readonly wager: number;
  readonly wheels: number;
  readonly spinnerState: TSpinnerState;
  readonly results: number[];
  readonly spinners: SpinnerProps[];
  readonly amount: number;
  readonly playersWallet: UserAccount;
}

const initialState: Partial<State> = {
  isWinner: false,
  spinnerState: TSpinnerState.RESTING,
  wager: WAGER,
  wheels: WHEEL_COUNT,
  results: [...Array(3).keys()].map(() => -1),
  playersWallet: undefined,
};

export interface EffectsSpinProps {
  state: State;
  setState: (state: Partial<State>) => void;
}

export interface SlotsContainerEffects {
  readonly setFromWallet: (Wallet: WalletSelectorOptionType | undefined) => void;
  readonly spin: (e: MouseEvent<HTMLElement>) => void;
}

const makeEffects = (client: Client, slots: SlotsSmartContract): EffectMap<State, SlotsContainerEffects> => ({
  setFromWallet: (valueWallet: WalletSelectorOptionType | undefined) => ({
    setState,
  }: {
    setState: (state: Partial<State>) => void;
  }) => {
    setState({ playersWallet: valueWallet === undefined ? undefined : valueWallet.userAccount });
  },

  spin: (e: MouseEvent<HTMLElement>) => ({ state, setState }) => {
    // set state that we are spinning...
    //    console.log(' SPINNER STATE: spinning');
    setState({ spinnerState: TSpinnerState.SPINNING });

    // ToDo: Take Wager from Player, validate transaction
    const onFinal = () => {
      setState({
        spinnerState: TSpinnerState.RESTING,
      });
    };
    // Produce random numbers....
    const updateResults = ([isWinner, amount, ...spins]: BigNumber[]) => {
      //      console.log(' SPINNER STATE: Settling');
      //      console.log(`isWinner: ${isWinner}\namount: ${amount}\nspins: ${spins}\n`);
      setState({
        spinnerState: TSpinnerState.SETTLING,
        isWinner: isWinner.toNumber() === WINNER_DEF ? true : false,
        amount: amount.toNumber(),
        results: spins.map((bn: BigNumber) => bn.toNumber()),
      });
      setTimeout(onFinal, 10000);
    };

    const onError = () => {
      setState(spinFailed);
    };

    const randomBn = () => {
      return new BigNumber(Math.floor(Math.random() * 100).toString());
    };

    setTimeout(() => {
      updateResults([new BigNumber('0'), new BigNumber('3'), randomBn(), randomBn(), randomBn()]);
    }, 2000);

    // slots
    //   .spin(
    //     new BigNumber(state.wheels.toString()),
    //     new BigNumber(state.wager.toString()), //
    //     'MakeSmartContractAcceptUserAccount', // address
    //   )
    //   .then(updateResults)
    //   .catch(onError);
  },
});

export const SlotsContainer = (props: ContainerProps<State, {}, {}, SlotsContainerEffects>) => (
  <WithContracts>
    {({ client, slots }) => <Container {...props} effects={makeEffects(client, slots)} initialState={initialState} />}
  </WithContracts>
);
