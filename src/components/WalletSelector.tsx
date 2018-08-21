import { Client, createPrivateKey, UserAccount } from '@neo-one/client';
import { Button, FromStream } from '@neo-one/react';
import * as React from 'react';
import { Flex, Input, Label, styled } from 'reakit';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultUserAccountProviders } from '../../one/generated';

const StyledLabel = styled(Label)`
  align-items: center;
  display: flex;
  font: inherit;
  line-height: inherit;
`;
const StyledInput = styled(Input)`
  margin-left: 16px;
  margin-right: 16px;
  width: 400px;
`;

interface Props {
  readonly client: Client<DefaultUserAccountProviders>;
}
const getKey = (account: UserAccount) => `${account.id.network}:${account.id.address}`;
export function WalletSelector({ client }: Props) {
  return (
    <FromStream
      props$={combineLatest(client.currentAccount$, client.accounts$).pipe(
        map(([currentAccount, accounts]) => ({ currentAccount, accounts })),
      )}
    >
      {({ currentAccount, accounts }) => (
        <Flex alignItems="center">
          <StyledLabel>
            Select Wallet
            <StyledInput
              as="select"
              value={currentAccount === undefined ? undefined : getKey(currentAccount)}
              // tslint:disable-next-line no-any
              onChange={(event: React.SyntheticEvent<any>) => {
                const [network, address] = event.currentTarget.value.split(':');
                client.selectAccount({ network, address });
              }}
            >
              {accounts.map((account) => (
                <option key={getKey(account)} value={getKey(account)}>
                  {account.name}
                </option>
              ))}
            </StyledInput>
          </StyledLabel>
          <Button
            onClick={() => {
              client.providers.memory.keystore
                .addAccount({
                  network: client.getCurrentNetwork(),
                  privateKey: createPrivateKey(),
                })
                .then((wallet) => client.selectAccount(wallet.account.id));
            }}
          >
            New Wallet
          </Button>
        </Flex>
      )}
    </FromStream>
  );
}
