import { Client, Hash256, TransactionResult } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Container } from 'reakit';
import { ICOSmartContract, WithContracts } from '../../one/generated';

const actions = {
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

const makeEffects = (client: Client, ico: ICOSmartContract) => ({
  send: () => ({ state: { amount }, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const from = client.getCurrentAccount();
    if (amount === undefined || from === undefined) {
      return;
    }

    setState({ loading: true });

    const onComplete = () => {
      setState({ loading: false });
    };

    const toConfirm = (result: TransactionResult) => {
      result
        .confirmed()
        .then(onComplete)
        .catch(onComplete);
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
      .catch(toConfirm);
  },
});

type Effects = ReturnType<typeof makeEffects>;

interface State {
  readonly text: string;
  readonly amount: BigNumber | undefined;
  readonly loading: boolean;
}

interface RenderProps extends State {
  readonly onChangeAmount: (typeof actions)['onChangeAmount'];
  readonly send: Effects['send'];
}

interface Props {
  readonly children: (props: RenderProps) => React.ReactNode;
}
export const ICOContainer = ({ children }: Props) => (
  <WithContracts>
    {({ client, ico }) => {
      const effects = makeEffects(client, ico);

      return (
        <Container initialState={{ text: '', loading: false }} actions={actions} effects={effects}>
          {children}
        </Container>
      );
    }}
  </WithContracts>
);
