// tslint:disable no-null-keyword no-any
import styled from '@emotion/styled';
import { UserAccount } from '@neo-one/client';
import { Box, Button, TextInput as TextInputBase } from '@neo-one/react-core';
import { BigNumber } from 'bignumber.js';
import * as React from 'react';
import { prop } from 'styled-tools';
import { EscrowContainer } from '../../containers';
import { ComponentProps } from '../../types';

const Flex = styled(Box)`
  display: flex;
`;

const Group = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled(Box)`
  display: inline-block;
`;

const TextInput = styled(TextInputBase)`
  ${prop('theme.fontStyles.subheading')};
`;

const StyledButton = styled(Button)`
  width: 72px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:disabled {
    background-color: ${prop('theme.gray3')};
    color: ${prop('theme.gray2')};
  }
`;

interface Props extends ComponentProps<typeof Flex> {
  readonly toWallet: UserAccount | undefined;
  readonly balance: BigNumber;
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
            disabled={
              sendAmount === undefined ||
              sendAmount.toNumber() > props.balance.toNumber() ||
              sendLoading ||
              props.toWallet === undefined
            }
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
            disabled={
              receiveAmount === undefined ||
              receiveAmount.toNumber() > props.balance.toNumber() ||
              receiveLoading ||
              props.toWallet === undefined
            }
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
            disabled={
              revokeAmount === undefined ||
              revokeAmount.toNumber() > props.balance.toNumber() ||
              revokeLoading ||
              props.toWallet === undefined
            }
            onClick={revoke}
          >
            Revoke
          </StyledButton>
        </Group>
      </Wrapper>
    )}
  </EscrowContainer>
);
