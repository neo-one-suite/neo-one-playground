import { UserAccount } from '@neo-one/client';
import { Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { WalletSelectorOptionType } from '../elements';

interface State {
  readonly toWallet: UserAccount | undefined;
}

interface Effects {
  readonly setToWallet: (Wallet: WalletSelectorOptionType | undefined) => void;
}

const makeEffects = (): EffectMap<State, Effects> => ({
  setToWallet: (valueWallet: WalletSelectorOptionType | undefined) => ({
    setState,
  }: {
    setState: (state: Partial<State>) => void;
  }) => {
    setState({ toWallet: valueWallet === undefined ? undefined : valueWallet.userAccount });
  },
});

export const WalletContainer = (props: ContainerProps<State, {}, {}, Effects>) => {
  const effects = makeEffects();

  return <Container {...props} effects={effects} />;
};
