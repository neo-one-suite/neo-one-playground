import { UserAccount } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import {
  getWalletSelectorOptions$,
  Logo,
  makeWalletSelectorValueOption,
  WalletSelectorBase,
  WalletSelectorOptionType,
} from '../../elements';
import { ComponentProps } from '../../types';
import { ReceiveONEBox, RevokeONEBox, SendONEBox } from './ActionComponents';

const StyledGrid = styled(Grid)`
  gap: 8px;
  padding: 8px 8px;
  margin-left: 200px;
  justify-items: left;
  align-items: center;
  background-color: ${prop('theme.gray1')};
  width: 768px;
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

const InputCell = styled(DoubleCell)`
  justify-self: left;
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const WalletSelector = styled(WalletSelectorBase)`
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  justify-self: right;
`;

interface Props extends ComponentProps<typeof StyledGrid> {
  readonly toWallet: UserAccount | undefined;
  readonly setToWallet: (wallet: WalletSelectorOptionType | undefined) => void;
}

const template = `
  "from from escrow escrow to to" auto
  "fbalance fvalue ebalance evalue tbalance tvalue" auto
  "send send logo logo selector selector" auto
  "revoke revoke logo logo receive receive" auto
  / 1fr 1fr 1fr 1fr 1fr 1fr
`;

export function EscrowApp({ toWallet, setToWallet, ...props }: Props) {
  return (
    <WithContracts>
      {({ client, one, escrow }) => (
        <FromStream
          props={[toWallet, client, one, escrow, setToWallet]}
          createStream={() =>
            concat(
              of(undefined),
              combineLatest([
                client.currentUserAccount$,
                getWalletSelectorOptions$(client, client.userAccounts$, client.block$),
                client.block$,
              ]).pipe(
                switchMap(async ([account, options]) => {
                  const [balance, fromBalance, toBalance] = await Promise.all([
                    account === undefined || toWallet === undefined
                      ? Promise.resolve(new BigNumber('0'))
                      : escrow.balanceOf(account.id.address, toWallet.id.address),
                    account === undefined ? Promise.resolve(new BigNumber('0')) : one.balanceOf(account.id.address),
                    toWallet === undefined ? Promise.resolve(new BigNumber('0')) : one.balanceOf(toWallet.id.address),
                  ]);

                  return {
                    options,
                    fromBalance,
                    toBalance,
                    balance,
                    fromAddress: account === undefined ? '' : account.id.address,
                    toAddress: toWallet === undefined ? '' : toWallet.id.address,
                  };
                }),
              ),
            )
          }
        >
          {(value) => (
            <StyledGrid {...props} template={template}>
              <HeaderCell area="from" data-test="from-account-header">
                From Account
              </HeaderCell>
              <HeaderCell area="escrow" data-test="escrow-account-header">
                Escrow Account
              </HeaderCell>
              <HeaderCell area="to" data-test="to-account-header">
                To Account
              </HeaderCell>
              <Cell area="fbalance" data-test="from-account-balance-label">
                Balance:
              </Cell>
              <Cell area="fvalue" data-test="from-account-balance">
                {value === undefined ? '' : value.fromBalance.toFormat()}
              </Cell>
              <Cell area="ebalance" data-test="escrow-account-balance-label">
                Balance:
              </Cell>
              <Cell area="evalue" data-test="escrow-account-balance">
                {value === undefined ? '' : value.balance.toFormat()}
              </Cell>
              <Cell area="tbalance" data-test="to-account-balance-label">
                Balance:
              </Cell>
              <Cell area="tvalue" data-test="to-account-balance">
                {value === undefined ? '' : value.toBalance.toFormat()}
              </Cell>
              <InputCell area="send">
                <SendONEBox toWallet={toWallet} balance={value === undefined ? new BigNumber(0) : value.fromBalance} />
              </InputCell>
              <DoubleCell area="logo">
                <StyledLogo />
              </DoubleCell>
              <Cell area="selector">
                <WalletSelector
                  data-test="escrow-wallet-selector"
                  value={toWallet === undefined ? undefined : makeWalletSelectorValueOption({ userAccount: toWallet })}
                  options={value === undefined ? [] : value.options}
                  onChange={(option: WalletSelectorOptionType | undefined) => {
                    if (option !== undefined && !Array.isArray(option)) {
                      setToWallet(option);
                    }
                  }}
                />
              </Cell>
              <InputCell area="revoke">
                <RevokeONEBox toWallet={toWallet} balance={value === undefined ? new BigNumber(0) : value.balance} />
              </InputCell>
              <InputCell area="receive">
                <ReceiveONEBox toWallet={toWallet} balance={value === undefined ? new BigNumber(0) : value.balance} />
              </InputCell>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
