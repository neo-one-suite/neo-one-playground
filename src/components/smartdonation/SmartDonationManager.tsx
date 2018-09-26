import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import { ComponentProps } from '../../types';
import { SetupAddressBox } from './ActionComponents';

const StyledGrid = styled(Grid)`
  gap: 10px;
  padding: 8px 8px;
  justify-items: right;
  text-align: center;
  align-items: center;
  background-color: ${prop('theme.gray1')};
  color: black;
  width: 700px;
`;

const Cell = styled(Grid.Item)`
  border: inherit;
  width: 100%;
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const template = `
"account gmessage gbalance cbalance sbutton" auto
"faccount message global current setup" auto
/ 1fr 2fr 1fr 1fr
`;

export function SmartDonationManager({ ...props }: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, smartDonation }) => (
        <FromStream
          props$={concat(
            of(undefined),
            combineLatest(client.currentAccount$, client.block$).pipe(
              switchMap(async ([account, options]) => {
                if (account === undefined) {
                  return {
                    account,
                    options,
                    message: '',
                    totalBalance: new BigNumber('-1'),
                    balance: new BigNumber('-1'),
                  };
                }

                const [message, totalBalance, balance] = await Promise.all([
                  smartDonation.getMessage(account.id.address),
                  smartDonation.getBalance(account.id.address),
                  smartDonation.getCurrentBalance(account.id.address),
                ]);

                return {
                  account,
                  options,
                  message,
                  totalBalance,
                  balance,
                };
              }),
            ),
          )}
        >
          {(value) => (
            <StyledGrid {...props} template={template}>
              <HeaderCell area="account" data-test="account">
                Account
              </HeaderCell>
              <Cell area="faccount" data-test="selected-account">
                {value === undefined ? '' : value.account === undefined ? '' : value.account.name}
              </Cell>
              <HeaderCell area="gmessage" data-test="global-message">
                Global Message
              </HeaderCell>
              <HeaderCell area="gbalance" data-test="global-balance">
                Total Balance
              </HeaderCell>
              <HeaderCell area="cbalance" data-test="current-balance">
                Current Balance
              </HeaderCell>
              <Cell area="message" data-test="account-contribution-message">
                {value === undefined ? '' : value.message}
              </Cell>
              <Cell area="global" data-test="account-global-balance">
                {value === undefined ? '' : value.totalBalance.lt(0) ? '' : value.totalBalance.toFormat()}
              </Cell>
              <Cell area="current" data-test="account-current-balance">
                {value === undefined ? '' : value.totalBalance.lt(0) ? '' : value.balance.toFormat()}
              </Cell>
              <Cell area="setup" data-test="setup-button">
                <SetupAddressBox disabled={value === undefined ? true : value.totalBalance.gte(0)} />
              </Cell>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
