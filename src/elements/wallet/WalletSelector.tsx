// tslint:disable no-null-keyword no-any
import { createPrivateKey, LocalKeyStore } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { WithContracts } from '../../../one/generated';
import { PatchedButton } from '../../components';
import { getWalletSelectorOptions$, makeWalletSelectorValueOption, WalletSelectorBase } from './WalletSelectorBase';

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
                <PatchedButton data-test="neo-one-wallet-selector-new-button" onClick={newWalletOnClick}>
                  New Wallet
                </PatchedButton>
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
                  <Grid columns="auto 1fr" gap={8}>
                    <Grid.Item>Address:</Grid.Item>
                    <Grid.Item>{value.address}</Grid.Item>
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
