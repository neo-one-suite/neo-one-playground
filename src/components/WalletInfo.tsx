import { Client, Hash256 } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { switchMap } from 'rxjs/operators';
import { ICOSmartContract } from '../../one/generated';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

interface Props {
  readonly client: Client;
  readonly ico: ICOSmartContract;
}
export function WalletInfo({ client, ico }: Props) {
  return (
    <FromStream
      props$={client.accountState$.pipe(
        switchMap(async (state) => {
          if (state === undefined) {
            return undefined;
          }

          const tokenBalance = await ico.balanceOf(state.currentAccount.id.address);
          const neoBalance = state.account.balances[Hash256.NEO] as BigNumber | undefined;
          const gasBalance = state.account.balances[Hash256.GAS] as BigNumber | undefined;

          return {
            currentAccount: state.currentAccount,
            neoBalance: neoBalance === undefined ? '0' : neoBalance.toFormat(),
            gasBalance: gasBalance === undefined ? '0' : gasBalance.toFormat(),
            tokenBalance,
          };
        }),
      )}
    >
      {(options) =>
        options === undefined ? (
          <div />
        ) : (
          <StyledGrid columns="120px 1fr" autoRows="auto" gap="0">
            {options.currentAccount.name === options.currentAccount.id.address ? (
              <></>
            ) : (
              <>
                <Grid.Item>Address:</Grid.Item>
                <Grid.Item>{options.currentAccount.id.address}</Grid.Item>
              </>
            )}
            <Grid.Item>NEO:</Grid.Item>
            <Grid.Item>{options.neoBalance}</Grid.Item>
            <Grid.Item>GAS:</Grid.Item>
            <Grid.Item>{options.gasBalance}</Grid.Item>
            <Grid.Item>ONE:</Grid.Item>
            <Grid.Item>{options.tokenBalance.toFormat()}</Grid.Item>
          </StyledGrid>
        )
      }
    </FromStream>
  );
}
