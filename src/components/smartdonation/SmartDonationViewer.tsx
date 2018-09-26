// tslint:disable no-any
import { UserAccount } from '@neo-one/client';
import {
  FromStream,
  getWalletSelectorOptions$,
  makeWalletSelectorValueOption,
  WalletSelectorBase,
  WalletSelectorOptionType,
} from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, Heading, Popover, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import { ComponentProps } from '../../types';
import { ContributeBox } from './ActionComponents';

const StyledGrid = styled(Grid)`
  gap: 12px;
  padding: 8px 8px;
  justify-items: center;
  text-align: center;
  align-items: center;
  background-color: ${prop('theme.gray1')};
`;

const AccountGrid = styled(Grid)`
  gap: 2px;
  padding: 2px 2px;
  text-align: left;
  align-items: left;
  background-color: ${prop('theme.gray1')};
`;

const Wrapper = styled(Grid)`
  gap: 4px;
  justify-items: center;
  align-items: center;
  padding: 2px 2px;
  background-color: ${prop('theme.gray2')};
  color: black;
  width: 700px;
`;

const Cell = styled(Grid.Item)`
  border: inherit;
  width: 100%;
`;

const DoubleCell = styled(Grid.Item)`
  align-self: center;
  justify-self: center;
  border: inherit;
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const WalletSelector = styled(WalletSelectorBase)`
  width: 200px;
`;

interface Props extends ComponentProps<typeof StyledGrid> {
  readonly source: UserAccount | undefined;
}

interface SelectorProps extends Props {
  readonly setToWallet: (wallet: WalletSelectorOptionType | undefined) => void;
}

const headerTemplate = `
  "header" auto
  "selector" auto
`;

const infoTemplate = `
  "header header header" auto
  "address address address" auto
  "mheader bheader cheader" auto
  "message balance contrib" auto
`;

const accountTemplate = `
  "aheader account" auto
  "cheader contrib" auto
  "mheader message" auto
  "bheader balance" auto
`;

const contributeTemplate = `
  "account account donate" auto
`;

const template = `
  "header" auto
  "info" auto
  "info" auto
  "info" auto
  "contribute" auto
  "contribute" auto
`;

export function SmartDonationViewer({ source, setToWallet, ...props }: SelectorProps) {
  return (
    <WithContracts>
      {({ client, smartDonation, one }) => (
        <FromStream
          props$={concat(
            of(undefined),
            combineLatest(
              client.currentAccount$,
              getWalletSelectorOptions$(() => undefined, client, of([])),
              client.block$,
            ).pipe(
              switchMap(async ([account, options]) => {
                const [
                  sourceMessage,
                  sourceContributions,
                  topContribution,
                  walletBalance,
                  walletMessage,
                  walletContributions,
                ] = await Promise.all([
                  source === undefined ? Promise.resolve('') : smartDonation.getMessage(source.id.address),
                  source === undefined
                    ? Promise.resolve(new BigNumber('-1'))
                    : smartDonation.getBalance(source.id.address),
                  source === undefined
                    ? Promise.resolve('')
                    : smartDonation.getTopContributorMessage(source.id.address),
                  account === undefined ? Promise.resolve(new BigNumber('-1')) : one.balanceOf(account.id.address),
                  account === undefined || source === undefined
                    ? Promise.resolve('')
                    : smartDonation.getContributorMessage(source.id.address, account.id.address),
                  account === undefined || source === undefined
                    ? Promise.resolve(new BigNumber('-1'))
                    : smartDonation.getContributorAmount(source.id.address, account.id.address),
                ]);

                return {
                  account,
                  sourceMessage,
                  sourceContributions,
                  topContribution,
                  walletBalance,
                  walletMessage,
                  walletContributions,
                  options,
                };
              }),
            ),
          )}
        >
          {(value) => (
            <Wrapper {...props} template={template}>
              <Cell area="header">
                <StyledGrid {...props} template={headerTemplate}>
                  <HeaderCell area="header">
                    <Popover.Container>
                      {(popover: any) => (
                        <>
                          <Heading as={Popover.Toggle} {...popover}>
                            Smart Donation Viewer
                          </Heading>
                          <Popover placement="top" fade slide expand hideOnClickOutside {...popover}>
                            <Popover.Arrow />
                            Select an account to view info and donate!
                          </Popover>
                        </>
                      )}
                    </Popover.Container>
                  </HeaderCell>
                  <DoubleCell area="selector">
                    <WalletSelector
                      data-test="escrow-wallet-selector"
                      value={source === undefined ? undefined : makeWalletSelectorValueOption({ userAccount: source })}
                      options={value === undefined ? [] : value.options}
                      onChange={(option) => {
                        if (option != undefined && !Array.isArray(option)) {
                          setToWallet(option);
                        }
                      }}
                    />
                  </DoubleCell>
                </StyledGrid>
              </Cell>
              <Cell area="info">
                <StyledGrid {...props} template={infoTemplate}>
                  <HeaderCell area="header">Donation Address</HeaderCell>
                  <HeaderCell area="mheader">Global Message</HeaderCell>
                  <HeaderCell area="bheader">Total Contributions</HeaderCell>
                  <HeaderCell area="cheader">Top Contributor Message</HeaderCell>
                  <Cell area="address">{source === undefined ? '' : source.id.address}</Cell>
                  <Cell area="message">{value === undefined ? '' : value.sourceMessage}</Cell>
                  <Cell area="balance">
                    {value === undefined || value.sourceContributions.lt(0) ? '' : value.sourceContributions.toFormat()}
                  </Cell>
                  <Cell area="contrib">{value === undefined ? '' : value.topContribution}</Cell>
                </StyledGrid>
              </Cell>
              <Cell area="contribute">
                <StyledGrid {...props} template={contributeTemplate}>
                  <Cell area="account">
                    <AccountGrid {...props} template={accountTemplate}>
                      <HeaderCell area="aheader">Selected Account</HeaderCell>
                      <HeaderCell area="cheader">Amount Contributed:</HeaderCell>
                      <HeaderCell area="mheader">Contribution Message:</HeaderCell>
                      <Cell area="bheader">Available ONE:</Cell>
                      <Cell area="account">
                        {value === undefined || value.account === undefined ? '' : value.account.name}
                      </Cell>
                      <Cell area="contrib">
                        {value === undefined || value.walletContributions.lt(0)
                          ? ''
                          : value.walletContributions.toFormat()}
                      </Cell>
                      <Cell area="message">{value === undefined ? '' : value.walletMessage}</Cell>
                      <Cell area="balance">{value === undefined ? '' : value.walletBalance.toFormat()}</Cell>
                    </AccountGrid>
                  </Cell>
                  <Cell area="donate">
                    <ContributeBox
                      toWallet={source}
                      disabled={value === undefined ? true : value.walletBalance.lte(0)}
                    />
                  </Cell>
                </StyledGrid>
              </Cell>
            </Wrapper>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
