import { Client } from '@neo-one/client';
import { ActionMap, Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { SmartDonationSmartContract, WithContracts } from '../../neo-one';

interface Actions {}

const actions: ActionMap<State, Actions> = {};

interface Effects {
  readonly setup: () => void;
}

interface State {
  readonly setupLoading: boolean;
}

const makeEffects = (client: Client, smartDonation: SmartDonationSmartContract): EffectMap<State, Effects> => ({
  setup: () => ({ state: {}, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const account = client.getCurrentUserAccount();
    if (account === undefined) {
      return;
    }

    setState({ setupLoading: true });

    const onComplete = () => {
      setState({ setupLoading: false });
    };

    const onError = (_error: Error) => {
      onComplete();
    };

    smartDonation.setupContributions
      .confirmed(account.id.address)
      .then((receipt) => {
        if (receipt.result.state === 'FAULT') {
          throw new Error(receipt.result.message);
        }
        onComplete();
      })
      .catch(onError);
  },
});

interface Props extends ContainerProps<State, Actions, {}, Effects> {}

export const SetupContainer = (props: Props) => (
  <WithContracts>
    {({ client, smartDonation }) => {
      const effects = makeEffects(client, smartDonation);

      return (
        <Container
          {...props}
          initialState={{
            setupLoading: false,
          }}
          actions={actions}
          effects={effects}
        />
      );
    }}
  </WithContracts>
);
