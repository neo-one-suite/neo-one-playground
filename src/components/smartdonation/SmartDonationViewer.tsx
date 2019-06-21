// tslint:disable no-any
import { UserAccount } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, Heading, Popover, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import {
  getWalletSelectorOptions$,
  makeWalletSelectorValueOption,
  WalletSelectorBase,
  WalletSelectorOptionType,
} from '../../elements';
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
          props={[client, one, smartDonation, setToWallet]}
          createStream={() =>
            concat(
              of(undefined),
              combineLatest([
                client.currentUserAccount$,
                getWalletSelectorOptions$(client, client.userAccounts$, client.block$),
                client.block$,
              ]).pipe(
                switchMap(async ([account, options]) => {
                  const [donationInfo, topContribution, walletBalance, contributionInfo] = await Promise.all([
                    source === undefined
                      ? Promise.resolve({
                          message: '',
                          balance: new BigNumber('-1'),
                          currentBalance: new BigNumber('-1'),
                          topContributor: '',
                        })
                      : smartDonation.getDonationInfo(source.id.address),
                    source === undefined
                      ? Promise.resolve('')
                      : smartDonation.getTopContributorMessage(source.id.address),
                    account === undefined ? Promise.resolve(new BigNumber('-1')) : one.balanceOf(account.id.address),
                    account === undefined || source === undefined
                      ? Promise.resolve({
                          amount: new BigNumber('-1'),
                          message: '',
                        })
                      : smartDonation.getContributionInfo(source.id.address, account.id.address),
                  ]);

                  return {
                    account,
                    donationInfo,
                    topContribution,
                    walletBalance,
                    contributionInfo,
                    options,
                  };
                }),
              ),
            )
          }
        >
          {(value) => (
            <Wrapper {...props} template={template}>
              <Cell area="header">
                <StyledGrid {...props} template={headerTemplate}>
                  <HeaderCell area="header">
                    <Popover.Container>
                      {(popover: any) => (
                        <>
                          <Heading as={Popover.Toggle} data-test="viewer-header" {...popover}>
                            Smart Donation Viewer
                          </Heading>
                          <Popover
                            placement="top"
                            data-test="viewer-header-popover"
                            fade
                            slide
                            expand
                            hideOnClickOutside
                            {...popover}
                          >
                            <Popover.Arrow />
                            Select an account to view info and donate!
                          </Popover>
                        </>
                      )}
                    </Popover.Container>
                  </HeaderCell>
                  <DoubleCell area="selector">
                    <WalletSelector
                      data-test="viewer-wallet-selector"
                      value={source === undefined ? undefined : makeWalletSelectorValueOption({ userAccount: source })}
                      options={value === undefined ? [] : value.options}
                      onChange={(option: any) => {
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
                  <HeaderCell area="header" data-test="viewer-address-header">
                    Donation Address
                  </HeaderCell>
                  <HeaderCell area="mheader" data-test="viewer-message-header">
                    Global Message
                  </HeaderCell>
                  <HeaderCell area="bheader" data-test="viewer-contributions-header">
                    Total Contributions
                  </HeaderCell>
                  <HeaderCell area="cheader" data-test="viewer-top-header">
                    Top Contributor Message
                  </HeaderCell>
                  <Cell area="address" data-test="viewer-address-value">
                    {source === undefined ? '' : source.id.address}
                  </Cell>
                  <Cell area="message" data-test="viewer-message-value">
                    {value === undefined ? '' : value.donationInfo.message}
                  </Cell>
                  <Cell area="balance" data-test="viewer-contributions-value">
                    {value === undefined || value.donationInfo.balance.lt(0)
                      ? ''
                      : value.donationInfo.balance.toFormat()}
                  </Cell>
                  <Cell area="contrib" data-test="viewer-top-value">
                    {value === undefined ? '' : value.topContribution}
                  </Cell>
                </StyledGrid>
              </Cell>
              <Cell area="contribute">
                <StyledGrid {...props} template={contributeTemplate}>
                  <Cell area="account">
                    <AccountGrid {...props} template={accountTemplate}>
                      <HeaderCell area="aheader" data-test="viewer-selected-header">
                        Selected Account
                      </HeaderCell>
                      <HeaderCell area="cheader" data-test="viewer-amount-header">
                        Amount Contributed:
                      </HeaderCell>
                      <HeaderCell area="mheader" data-test="viewer-contributor-message-header">
                        Contribution Message:
                      </HeaderCell>
                      <HeaderCell area="bheader" data-test="viewer-one-header">
                        Available ONE:
                      </HeaderCell>
                      <Cell area="account" data-test="viewer-selected-value">
                        {value === undefined || value.account === undefined ? '' : value.account.name}
                      </Cell>
                      <Cell area="contrib" data-test="viewer-amount-value">
                        {value === undefined || value.contributionInfo.amount.lt(0)
                          ? ''
                          : value.contributionInfo.amount.toFormat()}
                      </Cell>
                      <Cell area="message" data-test="viewer-contributor-message-value">
                        {value === undefined ? '' : value.contributionInfo.message}
                      </Cell>
                      <Cell area="balance" data-test="viewer-one-value">
                        {value === undefined ? '' : value.walletBalance.toFormat()}
                      </Cell>
                    </AccountGrid>
                  </Cell>
                  <Cell area="donate">
                    <ContributeBox
                      toWallet={source}
                      disabled={
                        value === undefined
                          ? true
                          : value.walletBalance.lte(0) || value.contributionInfo.message === 'Address is not set up'
                      }
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
