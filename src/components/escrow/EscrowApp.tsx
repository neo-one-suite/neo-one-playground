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
import { Grid, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import { Logo } from '../../elements/Logo';
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
`;

const DoubleCell = styled(Cell)`
  grid-column: span 2;
`;

const InputCell = styled(DoubleCell)`
  justify-self: left;
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
  grid-column: span 2;
  background-color: rgba(0, 0, 0, 0.05);
`;

const WalletSelector = styled(WalletSelectorBase)`
  width: 150px;
`;

interface Props extends ComponentProps<typeof StyledGrid> {
  readonly toWallet: UserAccount | undefined;
  readonly setToWallet: (wallet: WalletSelectorOptionType | undefined) => void;
}

export function EscrowApp(props: Props) {
  return (
    <WithContracts>
      {({ client, one, escrow }) => (
        <FromStream
          props$={concat(
            of(undefined),
            combineLatest(
              client.currentAccount$,
              getWalletSelectorOptions$(() => undefined, client, of([])),
              client.block$,
            ).pipe(
              switchMap(async ([account, options]) => {
                const [balance, fromBalance, toBalance] = await Promise.all([
                  account === undefined || props.toWallet === undefined
                    ? Promise.resolve(new BigNumber('0'))
                    : escrow.balanceOf(account.id.address, props.toWallet.id.address),
                  account === undefined ? Promise.resolve(new BigNumber('0')) : one.balanceOf(account.id.address),
                  props.toWallet === undefined
                    ? Promise.resolve(new BigNumber('0'))
                    : one.balanceOf(props.toWallet.id.address),
                ]);

                return {
                  options,
                  fromBalance,
                  toBalance,
                  balance,
                  fromAddress: account === undefined ? '' : account.id.address,
                  toAddress: props.toWallet === undefined ? '' : props.toWallet.id.address,
                };
              }),
            ),
          )}
        >
          {(value) => (
            <StyledGrid columns="repeat(6, 1fr)" autoRows="auto">
              <HeaderCell data-test="from-account-header">From Account</HeaderCell>
              <HeaderCell data-test="escrow-account-header">Escrow Account</HeaderCell>
              <HeaderCell data-test="to-account-header">To Account</HeaderCell>
              <Cell data-test="from-account-balance-label">Balance:</Cell>
              <Cell data-test="from-account-balance">{value === undefined ? '' : value.fromBalance.toFormat()}</Cell>
              <Cell data-test="escrow-account-balance-label">Balance:</Cell>
              <Cell data-test="escrow-account-balance">{value === undefined ? '' : value.balance.toFormat()}</Cell>
              <Cell data-test="to-account-balance-label">Balance:</Cell>
              <Cell data-test="to-account-balance">{value === undefined ? '' : value.toBalance.toFormat()}</Cell>
              <InputCell column="span 2">
                <SendONEBox {...props} />
              </InputCell>
              <DoubleCell column="span 2" row="span 2">
                <Logo />
              </DoubleCell>
              <Cell column="span 2">
                <WalletSelector
                  data-test="escrow-wallet-selector"
                  value={
                    props.toWallet === undefined
                      ? undefined
                      : makeWalletSelectorValueOption({ userAccount: props.toWallet })
                  }
                  options={value === undefined ? [] : value.options}
                  onChange={(option) => {
                    if (option != undefined && !Array.isArray(option)) {
                      props.setToWallet(option);
                    }
                  }}
                />
              </Cell>
              <InputCell column="span 2">
                <RevokeONEBox {...props} />
              </InputCell>
              <InputCell column="span 2">
                <ReceiveONEBox {...props} />
              </InputCell>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
