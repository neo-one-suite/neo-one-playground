import { Client } from '@neo-one/client';
import { ActionMap, Container, ContainerProps, EffectMap } from 'constate';
import * as React from 'react';
import { SmartDonationSmartContract, WithContracts } from '../../../one/generated';

interface Actions {
  readonly onChangeMessage: (text: string) => void;
}

const onChangeMessage = (text: string) => {
  if (text.length > 200) {
    return undefined;
  }

  return text;
};

const actions: ActionMap<State, Actions> = {
  onChangeMessage: (message: string) => () => ({
    message: onChangeMessage(message),
  }),
};

interface Effects {
  readonly update: () => void;
}

interface State {
  readonly message: string;
  readonly loading: boolean;
}

const makeEffects = (client: Client, smartDonation: SmartDonationSmartContract): EffectMap<State, Effects> => ({
  update: () => ({ state: { message }, setState }: { state: State; setState: (state: Partial<State>) => void }) => {
    const account = client.getCurrentUserAccount();
    if (account === undefined) {
      return;
    }

    setState({ loading: true });

    const onComplete = () => {
      setState({ loading: false });
    };

    const onError = (_error: Error) => {
      onComplete();
    };

    smartDonation.updateMessage
      .confirmed(account.id.address, message)
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

export const MessageContainer = (props: Props) => (
  <WithContracts>
    {({ client, smartDonation }) => {
      const effects = makeEffects(client, smartDonation);

      return (
        <Container
          {...props}
          initialState={{
            message: '',
            loading: false,
          }}
          actions={actions}
          effects={effects}
        />
      );
    }}
  </WithContracts>
);
