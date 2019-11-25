// tslint:disable no-any
import styled from '@emotion/styled';
import { Account, Client, Hash256, UserAccount } from '@neo-one/client';
import { Box } from '@neo-one/react-core';
import { PromiseReturnType, utils } from '@neo-one/utils';
import BigNumber from 'bignumber.js';
import * as React from 'react';
// tslint:disable-next-line no-submodule-imports
import { FormatOptionLabelMeta } from 'react-select/lib/Select';
import { combineLatest, concat, of, ReplaySubject } from 'rxjs';
import { catchError, distinctUntilChanged, map, multicast, refCount, switchMap, take } from 'rxjs/operators';
import { Select } from './Select';

const Grid = styled(Box)`
  display: grid;
`;

const GridItem = styled(Box)``;

export const makeOption = async ({
  userAccount,
  account,
}: {
  readonly client: Client;
  readonly userAccount: UserAccount;
  readonly account: Account;
}) => {
  const assetBalances = await Promise.all(
    Object.entries(account.balances).map<Promise<[string, BigNumber] | undefined>>(async ([assetHash, value]) => {
      if (assetHash === Hash256.NEO) {
        return ['NEO', value];
      }

      if (assetHash === Hash256.GAS) {
        return ['GAS', value];
      }

      return undefined;
    }),
  );

  return {
    value: `${userAccount.id.network}:${userAccount.id.address}`,
    label: userAccount.name,
    address: userAccount.id.address,
    id: userAccount.id,
    userAccount,
    // tslint:disable-next-line no-array-mutation
    balances: assetBalances.filter(utils.notNull),
  };
};

export const makeWalletSelectorValueOption = ({ userAccount }: { readonly userAccount: UserAccount }) => ({
  value: `${userAccount.id.network}:${userAccount.id.address}`,
  label: userAccount.name,
  address: userAccount.id.address,
  id: userAccount.id,
  userAccount,
});

export type WalletSelectorOptionType =
  | PromiseReturnType<typeof makeOption>
  | ReturnType<typeof makeWalletSelectorValueOption>;

export const getWalletSelectorOptions$ = (
  client: Client,
  userAccounts$: Client['userAccounts$'],
  block$: Client['block$'],
) =>
  concat(
    userAccounts$.pipe(
      take(1),
      map((userAccounts) => userAccounts.map((userAccount) => makeWalletSelectorValueOption({ userAccount }))),
    ),
    combineLatest([userAccounts$.pipe(distinctUntilChanged()), block$]).pipe(
      switchMap(async ([userAccounts]) =>
        Promise.all(
          userAccounts.map(async (userAccount) => {
            const account = await client.getAccount(userAccount.id);

            return makeOption({
              client,
              userAccount,
              account,
            });
          }),
        ),
      ),
      multicast(() => new ReplaySubject(1)),
      refCount(),
      catchError((_error: Error) => of([])),
    ),
  );

const AddressGrid = styled(Grid)`
  padding: 8px 0;
  grid-template-columns: 80px 1fr;
  grid-auto-rows: auto;
  grid-gap: 0;
`;

const createFormatOptionLabel = (isMulti?: boolean) => (
  option: WalletSelectorOptionType,
  { context }: FormatOptionLabelMeta<WalletSelectorOptionType>,
): React.ReactNode => {
  if (context === 'value') {
    return isMulti && option.label === option.address ? option.address.slice(0, 4) : option.label;
  }

  return (
    <AddressGrid>
      <GridItem>Name:</GridItem>
      <GridItem>{option.label}</GridItem>
      {option.label === option.address ? (
        <></>
      ) : (
        <>
          <GridItem>Address:</GridItem>
          <GridItem>{option.address}</GridItem>
        </>
      )}
      {((option as any).balances === undefined ? [] : (option as any).balances).map(
        ([name, value]: [string, BigNumber]) => (
          <React.Fragment key={name}>
            <GridItem>{name}:</GridItem>
            <GridItem>{value.toFormat()}</GridItem>
          </React.Fragment>
        ),
      )}
    </AddressGrid>
  );
};

const formatOptionLabelMulti = createFormatOptionLabel(true);
const formatOptionLabel = createFormatOptionLabel(false);

const StyledSelect = styled(Select)`
  min-width: 96px;
  max-width: 424px;
`;

export function WalletSelectorBase(props: any) {
  return (
    <StyledSelect
      menuPlacement="bottom"
      {...props}
      formatOptionLabel={props.isMulti ? formatOptionLabelMulti : formatOptionLabel}
    />
  );
}
