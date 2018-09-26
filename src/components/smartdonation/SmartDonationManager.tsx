import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { combineLatest, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import { ComponentProps } from '../../types';
import { CollectBox, MessageBox, SetupAddressBox } from './ActionComponents';

const StyledGrid = styled(Grid)`
  gap: 12px;
  padding: 8px 8px;
  justify-items: center;
  text-align: center;
  align-items: center;
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

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const accountTemplate = `
  "aheader address" auto
  "gheader balance" auto
  "cheader current" auto
`;

const infoTemplate = `
  "info" auto
  "info" auto
  "button" auto
`;

const subTemplate = `
  "aheader mheader" auto
  "address message" auto
`;

const footerTemplate = `
  "info info update"
`;

const template = `
  "header" auto
  "subheader" auto
  "subheader" auto
  "footer" auto
  "footer" auto
  "footer" auto
  / 1fr
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
            <Wrapper {...props} template={template}>
              <Cell area="header">
                <StyledGrid {...props}>
                  <HeaderCell>Smart Donation Manager</HeaderCell>
                </StyledGrid>
              </Cell>
              <Cell area="subheader">
                <StyledGrid {...props} template={subTemplate}>
                  <HeaderCell area="aheader">Current Address</HeaderCell>
                  <HeaderCell area="mheader">Current Message</HeaderCell>
                  <Cell area="address">
                    {value === undefined || value.account === undefined ? '' : value.account.id.address}
                  </Cell>
                  <Cell area="message">{value === undefined ? '' : value.message}</Cell>
                </StyledGrid>
              </Cell>
              <Cell area="footer">
                <StyledGrid {...props} template={footerTemplate}>
                  <Cell area="info">
                    <StyledGrid {...props} template={infoTemplate}>
                      <Cell area="info">
                        <StyledGrid {...props} template={accountTemplate}>
                          <HeaderCell area="aheader">Selected Account:</HeaderCell>
                          <HeaderCell area="gheader">Total Contributions:</HeaderCell>
                          <HeaderCell area="cheader">Available Balance:</HeaderCell>
                          <Cell area="address">
                            {value === undefined || value.account === undefined ? '' : value.account.name}
                          </Cell>
                          <Cell area="balance">
                            {value === undefined || value.totalBalance.lte(0) ? '' : value.totalBalance.toFormat()}
                          </Cell>
                          <Cell area="current">
                            {value === undefined || value.totalBalance.lte(0) ? '' : value.balance.toFormat()}
                          </Cell>
                        </StyledGrid>
                      </Cell>
                      <Cell area="button">
                        {value === undefined || value.totalBalance.lt(0) ? (
                          <SetupAddressBox disabled={value === undefined} />
                        ) : (
                          <CollectBox disabled={value.balance.lte(0)} />
                        )}
                      </Cell>
                    </StyledGrid>
                  </Cell>
                  <Cell area="update">
                    <MessageBox disabled={value === undefined} />
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
