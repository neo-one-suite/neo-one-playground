// tslint:disable no-null-keyword no-any
import { UserAccount } from '@neo-one/client';
import { Button, TextInput } from '@neo-one/react-core';
import * as React from 'react';
import { Box, Flex, Group, styled } from 'reakit';
import { prop } from 'styled-tools';
import { EscrowContainer } from '../../containers';
import { ComponentProps } from '../../types';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const StyledButton = styled(Button)`
  width: 72px;

  &:disabled {
    background-color: ${prop('theme.gray3')};
    color: ${prop('theme.gray2')};
  }
`;

interface Props extends ComponentProps<typeof Flex> {
  readonly toWallet: UserAccount | undefined;
}

export const SendONEBox = (props: Props) => (
  <EscrowContainer toWallet={props.toWallet}>
    {({ sendText, sendAmount, sendLoading, onChangeSendAmount, send }) => (
      <Wrapper>
        <Group>
          <TextInput
            data-test="send-one-input"
            value={sendText}
            placeholder="Send ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeSendAmount(event.currentTarget.value)}
          />
          <StyledButton
            data-test="send-one-button"
            disabled={sendAmount === undefined || sendLoading || props.toWallet === undefined}
            onClick={send}
          >
            Send
          </StyledButton>
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
          <TextInput
            data-test="receive-one-input"
            value={receiveText}
            placeholder="Receive ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeReceiveAmount(event.currentTarget.value)}
          />
          <StyledButton
            data-test="receive-one-button"
            disabled={receiveAmount === undefined || receiveLoading || props.toWallet === undefined}
            onClick={receive}
          >
            Receive
          </StyledButton>
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
          <TextInput
            data-test="revoke-one-input"
            value={revokeText}
            placeholder="Revoke ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeRevokeAmount(event.currentTarget.value)}
          />
          <StyledButton
            data-test="revoke-one-button"
            disabled={revokeAmount === undefined || revokeLoading || props.toWallet === undefined}
            onClick={revoke}
          >
            Revoke
          </StyledButton>
        </Group>
      </Wrapper>
    )}
  </EscrowContainer>
);
