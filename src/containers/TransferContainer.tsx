// tslint:disable no-null-keyword
import { Client, Hash256, TransactionResult, UserAccountID } from '@neo-one/client';
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
  // tslint:disable-next-line no-any
  onChangeAsset: (asset: string) => () => ({
    asset,
  }),
  // tslint:disable-next-line no-any
  onChangeTo: (value: string) => () => {
    const [network, address] = value.split(':');

    return { to: { network, address } };
  },
};

export const TOKEN = 'token';

const makeEffects = (client: Client, ico: ICOSmartContract) => ({
  send: () => ({
    state: { asset, to, amount },
    setState,
  }: {
    state: State;
    setState: (state: Partial<State>) => void;
  }) => {
    const from = client.getCurrentAccount();
    if (amount === undefined || to === undefined || from === undefined) {
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

    // tslint:disable-next-line possible-timing-attack
    if (asset === TOKEN) {
      ico
        .transfer(from.id.address, to.address, amount)
        .then(toConfirm)
        .catch(toConfirm);
    } else {
      client
        .transfer(amount, asset, to.address)
        .then(toConfirm)
        .catch(toConfirm);
    }
  },
});

type Effects = ReturnType<typeof makeEffects>;

interface State {
  readonly text: string;
  readonly to: UserAccountID | undefined;
  readonly asset: string;
  readonly amount: BigNumber | undefined;
  readonly loading: boolean;
}

interface RenderProps extends State {
  readonly onChangeAmount: (typeof actions)['onChangeAmount'];
  readonly onChangeAsset: (typeof actions)['onChangeAsset'];
  readonly send: Effects['send'];
  readonly onChangeTo: (typeof actions)['onChangeTo'];
}

interface Props {
  readonly children: (props: RenderProps) => React.ReactNode;
}
export const TransferContainer = ({ children }: Props) => (
  <WithContracts>
    {({ client, ico }) => {
      const effects = makeEffects(client, ico);

      return (
        <Container
          initialState={{ text: '', asset: Hash256.NEO, loading: false }}
          context="transfer"
          actions={actions}
          effects={effects}
        >
          {children}
        </Container>
      );
    }}
  </WithContracts>
);
