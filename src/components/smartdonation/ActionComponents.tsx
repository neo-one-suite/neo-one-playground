// tslint:disable no-null-keyword no-any
import { UserAccount } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Box, Flex, Grid, styled } from 'reakit';
import { prop } from 'styled-tools';
import { PatchedButton, PatchedDarkTextInput } from '../../components';
import { CollectContainer, ContributeContainer, MessageContainer, SetupContainer } from '../../containers';
import { ComponentProps } from '../../types';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const StyledButton = styled(PatchedButton)`
  width: 100px;

  &:disabled {
    background-color: ${prop('theme.gray3')};
    color: ${prop('theme.gray2')};
  }
`;

const Cell = styled(Grid.Item)`
  border: inherit;
  width: 100%;
`;

const StyledInput = styled(PatchedDarkTextInput)`
  width: 90%;
`;

const StyledGrid = styled(Grid)`
  gap: 12px;
  padding: 2px 2px;
  text-align: center;
  align-items: center;
  background-color: ${prop('theme.gray1')};
`;

interface Props extends ComponentProps<typeof Flex> {
  readonly disabled: boolean;
}

interface WalletProps extends Props {
  readonly toWallet: UserAccount | undefined;
}

const contributeTemplate = `
  "minput button" auto
  "cinput button" auto
`;

const messageTemplate = `
  "input" auto
  "input" auto
  "button" auto
`;

export const SetupAddressBox = (props: Props) => (
  <SetupContainer>
    {({ setupLoading, setup }) => (
      <Wrapper>
        <StyledButton data-test="setup-button" disabled={setupLoading || props.disabled} onClick={setup}>
          Setup
        </StyledButton>
      </Wrapper>
    )}
  </SetupContainer>
);

export const CollectBox = (props: Props) => (
  <CollectContainer>
    {({ collectLoading, collect }) => (
      <Wrapper>
        <StyledButton data-test="collect-button" disabled={collectLoading || props.disabled} onClick={collect}>
          Collect
        </StyledButton>
      </Wrapper>
    )}
  </CollectContainer>
);

export const MessageBox = (props: Props) => (
  <MessageContainer>
    {({ loading, update, message, onChangeMessage }) => (
      <StyledGrid {...props} template={messageTemplate}>
        <Cell area="input">
          <StyledInput
            as="textarea"
            data-test="message-box-input"
            value={message}
            placeholder="Update your global message!"
            onChange={(event: React.SyntheticEvent<any>) => onChangeMessage(event.currentTarget.value)}
          />
        </Cell>
        <Cell area="button">
          <StyledButton
            data-test="message-button"
            disabled={props.disabled || loading || message === ''}
            onClick={update}
          >
            Update
          </StyledButton>
        </Cell>
      </StyledGrid>
    )}
  </MessageContainer>
);

export const ContributeBox = (props: WalletProps) => (
  <ContributeContainer toWallet={props.toWallet}>
    {({ contributeLoading, message, amountText, amount, onChangeContributeAmount, onChangeMessage, contribute }) => (
      <StyledGrid {...props} template={contributeTemplate}>
        <Cell area="minput">
          <StyledInput
            as="textarea"
            data-test="contribute-message-input"
            value={message}
            placeholder="Send a message!"
            onChange={(event: React.SyntheticEvent<any>) => onChangeMessage(event.currentTarget.value)}
          />
        </Cell>
        <Cell area="cinput">
          <StyledInput
            data-test="contribute-one-input"
            value={amountText}
            placeholder="Contribute ONE"
            onChange={(event: React.SyntheticEvent<any>) => onChangeContributeAmount(event.currentTarget.value)}
          />
        </Cell>
        <Cell area="button">
          <StyledButton
            data-test="contribute-button"
            disabled={
              props.disabled ||
              contributeLoading ||
              props.toWallet === undefined ||
              (amount === undefined && message === '') ||
              (amount !== undefined && !amount.isEqualTo(new BigNumber(amountText)))
            }
            onClick={contribute}
          >
            {message !== '' && amountText === '' ? 'Set Message' : 'Contribute'}
          </StyledButton>
        </Cell>
      </StyledGrid>
    )}
  </ContributeContainer>
);
