// tslint:disable no-null-keyword no-any
import styled from '@emotion/styled';
import { createPrivateKey, LocalKeyStore } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import { Box, Button } from '@neo-one/react-core';
import * as React from 'react';
import { combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { WithContracts } from '../../neo-one';
import { getWalletSelectorOptions$, makeWalletSelectorValueOption, WalletSelectorBase } from './WalletSelectorBase';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`;

const GridItem = styled(Box)``;

const WalletSelectorWrapper = styled(Grid)`
  grid:
    'selector button' auto
    / minmax(96px, 1fr) auto;
  gap: 8px;
`;

export function WalletSelector(props: any) {
  return (
    <WithContracts>
      {({ client }) => (
        <FromStream
          props={[client]}
          createStream={() =>
            combineLatest([
              client.currentUserAccount$.pipe(
                distinctUntilChanged(),
                map((value) => (value === undefined ? value : makeWalletSelectorValueOption({ userAccount: value }))),
              ),
              getWalletSelectorOptions$(client, client.userAccounts$, client.block$),
            ]).pipe(
              catchError((_error) =>
                // tslint:disable-next-line no-any
                of<any>([undefined, []]),
              ),
            )
          }
        >
          {([value, options]) => {
            let newWalletOnClick: (() => void) | undefined;
            if (client.providers.localStorage !== undefined && client.providers.localStorage.keystore !== undefined) {
              const keystore = client.providers.localStorage.keystore;
              if (keystore instanceof LocalKeyStore) {
                newWalletOnClick = () => {
                  keystore
                    .addUserAccount({
                      network: client.getCurrentNetwork(),
                      privateKey: createPrivateKey(),
                    })
                    .then(async (wallet) => client.selectUserAccount(wallet.userAccount.id))
                    .catch();
                };
              }
            }
            if (
              newWalletOnClick === undefined &&
              client.providers.memory !== undefined &&
              client.providers.memory.keystore !== undefined
            ) {
              const keystore = client.providers.memory.keystore;
              if (keystore instanceof LocalKeyStore) {
                newWalletOnClick = () => {
                  keystore
                    .addUserAccount({
                      network: client.getCurrentNetwork(),
                      privateKey: createPrivateKey(),
                    })
                    .then(async (wallet) => client.selectUserAccount(wallet.userAccount.id))
                    .catch();
                };
              }
            }

            const newWalletButton =
              // tslint:disable-next-line no-null-keyword
              newWalletOnClick === undefined ? null : (
                <Button data-test="neo-one-wallet-selector-new-button" onClick={newWalletOnClick} {...props}>
                  New Wallet
                </Button>
              );

            return (
              <>
                <WalletSelectorWrapper>
                  <WalletSelectorBase
                    data-test="neo-one-wallet-selector-selector"
                    {...props}
                    value={value}
                    options={options}
                    onChange={(option: any) => {
                      if (option !== undefined && !Array.isArray(option)) {
                        client.selectUserAccount(option.id).catch();
                      }
                    }}
                  />
                  {newWalletButton}
                </WalletSelectorWrapper>
                {value === undefined ? null : (
                  <Grid>
                    <GridItem>Address:</GridItem>
                    <GridItem>{value.address}</GridItem>
                  </Grid>
                )}
              </>
            );
          }}
        </FromStream>
      )}
    </WithContracts>
  );
}
