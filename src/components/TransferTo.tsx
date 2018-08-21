import { UserAccountID } from '@neo-one/client';
import { FromStream } from '@neo-one/react';
import * as React from 'react';
import { Input, Label, styled } from 'reakit';
import { WithContracts } from '../../one/generated';
import { TransferContainer } from '../containers';
import { ComponentProps } from '../types';

const StyledLabel = styled(Label)`
  align-items: center;
  display: flex;
  font: inherit;
  line-height: inherit;
`;
const StyledInput = styled(Input)`
  margin-left: 35px;
  width: 400px;
`;

const getKey = (account: UserAccountID) => `${account.network}:${account.address}`;
export function TransferTo(props: ComponentProps<typeof StyledLabel>) {
  return (
    <WithContracts>
      {({ client }) => (
        <FromStream props$={client.accounts$}>
          {(accounts) => (
            <TransferContainer>
              {({ to, onChangeTo }) => (
                <StyledLabel {...props}>
                  To Address
                  <StyledInput
                    as="select"
                    value={to === undefined ? undefined : getKey(to)}
                    // tslint:disable-next-line no-any
                    onChange={(event: React.SyntheticEvent<any>) => onChangeTo(event.currentTarget.value)}
                  >
                    {accounts.map((account) => (
                      <option key={getKey(account.id)} value={getKey(account.id)}>
                        {account.name}
                      </option>
                    ))}
                  </StyledInput>
                </StyledLabel>
              )}
            </TransferContainer>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
