import { Client } from '@neo-one/client';
import { WithAddError } from '@neo-one/react';
import { ActionMap, Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { SmartDonationSmartContract, WithContracts } from '../../../one/generated';

interface Actions {}

const actions: ActionMap<State, Actions> = {};

interface Effects {
  readonly collect: () => void;
}

interface State {
  readonly collectLoading: boolean;
}

const makeEffects = (
  client: Client,
  smartDonation: SmartDonationSmartContract,
  addError: (error: Error) => void,
): EffectMap<State, Effects> => ({
  collect: () => ({ state: {}, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const account = client.getCurrentAccount();
    if (account === undefined) {
      addError(new Error('No account selected.'));

      return;
    }

    setState({ collectLoading: true });

    const onComplete = () => {
      setState({ collectLoading: false });
    };

    const onError = (error: Error) => {
      onComplete();
      addError(error);
    };

    smartDonation.collect
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

export const CollectContainer = (props: Props) => (
  <WithContracts>
    {({ client, smartDonation }) => (
      <WithAddError>
        {(addError) => {
          const effects = makeEffects(client, smartDonation, addError);

          return (
            <Container
              {...props}
              initialState={{
                collectLoading: false,
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
