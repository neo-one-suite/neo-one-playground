// tslint:disable no-null-keyword no-any
import { UserAccount } from '@neo-one/client';
import { Button } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Box, Flex, Grid, Input, styled } from 'reakit';
import { prop } from 'styled-tools';
import { SDViewerContainer } from '../../containers';
import { SDManagerContainer } from '../../containers/SDManagerContainer';
import { ComponentProps } from '../../types';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const StyledButton = styled(Button)`
  width: 100px;
`;

const Cell = styled(Grid.Item)`
  border: inherit;
  width: 100%;
`;

const StyledInput = styled(Input)`
  background-color: ${prop('theme.primaryDark')};
`;

const StyledGrid = styled(Grid)`
  gap: 12px;
  padding: 2px 2px;
  text-align: center;
  align-items: center;
  background-color: ${prop('theme.gray1')};
`;

interface ManagerProps extends ComponentProps<typeof Flex> {
  readonly disabled: boolean;
}

interface ViewerProps extends ManagerProps {
  readonly toWallet: UserAccount | undefined;
}

const contributeTemplate = `
  "minput button" auto
  "cinput button" auto
`;

export const SetupAddressBox = (props: ManagerProps) => (
  <SDManagerContainer>
    {({ setupLoading, setup }) => (
      <Wrapper>
        <StyledButton data-test="setup-button" disabled={setupLoading || props.disabled} onClick={setup}>
          Setup
        </StyledButton>
      </Wrapper>
    )}
  </SDManagerContainer>
);

export const ContributeBox = (props: ViewerProps) => (
  <SDViewerContainer toWallet={props.toWallet}>
    {({ contributeLoading, message, amountText, amount, onChangeContributeAmount, onChangeMessage, contribute }) => (
      <StyledGrid {...props} template={contributeTemplate}>
        <Cell area="minput">
          <StyledInput
            as="textarea"
            data-test="message-input"
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
  </SDViewerContainer>
);
