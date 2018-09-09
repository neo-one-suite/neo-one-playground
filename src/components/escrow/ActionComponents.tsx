// tslint:disable no-null-keyword no-any
import { UserAccount } from '@neo-one/client';
import { Button } from '@neo-one/react';
import * as React from 'react';
import { Base, Flex, Group, Input, styled } from 'reakit';
import { EscrowContainer } from '../../containers';
import { ComponentProps } from '../../types';

const StyledInput = styled(Input)`
  width: 150px;
`;

const Wrapper = styled(Base)`
  display: inline-block;
`;

interface Props extends ComponentProps<typeof Flex> {
  readonly toWallet: UserAccount | undefined;
}

export const SendONEBox = (props: Props) => (
  <EscrowContainer toWallet={props.toWallet}>
    {({ sendText, sendAmount, sendLoading, onChangeSendAmount, send }) => (
      <Wrapper>
        <Group>
          <StyledInput
            data-test="send-one-input"
            value={sendText}
            placeholder="Send ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeSendAmount(event.currentTarget.value)}
          />
          <Button data-test="send-one-button" disabled={sendAmount === undefined || sendLoading} onClick={send}>
            Send
          </Button>
        </Group>
      </Wrapper>
    )}
  </EscrowContainer>
);

export const ReceiveONEBox = (props: Props) => (
  <EscrowContainer toWallet={props.toWallet}>
    {({ receiveText, receiveAmount, receiveLoading, onChangeReceiveAmount, receive }) => (
      <Wrapper>
        <Group>
          <StyledInput
            data-test="receive-one-input"
            value={receiveText}
            placeholder="Receive ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeReceiveAmount(event.currentTarget.value)}
          />
          <Button
            data-test="receive-one-button"
            disabled={receiveAmount === undefined || receiveLoading}
            onClick={receive}
          >
            Receive
          </Button>
        </Group>
      </Wrapper>
    )}
  </EscrowContainer>
);

export const RevokeONEBox = (props: Props) => (
  <EscrowContainer toWallet={props.toWallet}>
    {({ revokeText, revokeAmount, revokeLoading, onChangeRevokeAmount, revoke }) => (
      <Wrapper>
        <Group>
          <StyledInput
            data-test="revoke-one-input"
            value={revokeText}
            placeholder="Revoke ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeRevokeAmount(event.currentTarget.value)}
          />
          <Button data-test="revoke-one-button" disabled={revokeAmount === undefined || revokeLoading} onClick={revoke}>
            Revoke
          </Button>
        </Group>
      </Wrapper>
    )}
  </EscrowContainer>
);
