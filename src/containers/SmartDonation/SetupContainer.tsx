import { Client } from '@neo-one/client';
import { WithAddError } from '@neo-one/react';
import { ActionMap, Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { SmartDonationSmartContract, WithContracts } from '../../../one/generated';

interface Actions {}

const actions: ActionMap<State, Actions> = {};

interface Effects {
  readonly setup: () => void;
}

interface State {
  readonly setupLoading: boolean;
}

const makeEffects = (
  client: Client,
  smartDonation: SmartDonationSmartContract,
  addError: (error: Error) => void,
): EffectMap<State, Effects> => ({
  setup: () => ({ state: {}, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const account = client.getCurrentAccount();
    if (account === undefined) {
      addError(new Error('Unable to setup account. No account selected.'));

      return;
    }

    setState({ setupLoading: true });

    const onComplete = () => {
      setState({ setupLoading: false });
    };

    const onError = (error: Error) => {
      onComplete();
      addError(error);
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
    {({ client, smartDonation }) => (
      <WithAddError>
        {(addError) => {
          const effects = makeEffects(client, smartDonation, addError);

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
      </WithAddError>
    )}
  </WithContracts>
);
