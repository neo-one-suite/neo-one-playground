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

const CenteredHeader = styled(HeaderCell)`
  text-align: center;
`;

const accountTemplate = `
  "aheader address" auto
  "gheader total" auto
  "cheader available" auto
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
          createStream={() =>
            concat(
              of(undefined),
              combineLatest([client.currentUserAccount$, client.block$]).pipe(
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

                  const {
                    message,
                    balance: totalBalance,
                    currentBalance: balance,
                  } = await smartDonation.getDonationInfo(account.id.address);

                  return {
                    account,
                    options,
                    message,
                    totalBalance,
                    balance,
                  };
                }),
              ),
            )
          }
        >
          {(value) => (
            <Wrapper {...props} template={template}>
              <Cell area="header" data-test="manager-header">
                <StyledGrid {...props}>
                  <CenteredHeader>Smart Donation Manager</CenteredHeader>
                </StyledGrid>
              </Cell>
              <Cell area="subheader">
                <StyledGrid {...props} template={subTemplate}>
                  <HeaderCell area="aheader" data-test="manager-address-header">
                    Current Address
                  </HeaderCell>
                  <HeaderCell area="mheader" data-test="manager-message-header">
                    Current Message
                  </HeaderCell>
                  <Cell area="address" data-test="manager-address-value">
                    {value === undefined || value.account === undefined ? '' : value.account.id.address}
                  </Cell>
                  <Cell area="message" data-test="manager-message-value">
                    {value === undefined ? '' : value.message}
                  </Cell>
                </StyledGrid>
              </Cell>
              <Cell area="footer">
                <StyledGrid {...props} template={footerTemplate}>
                  <Cell area="info">
                    <StyledGrid {...props} template={infoTemplate}>
                      <Cell area="info">
                        <StyledGrid {...props} template={accountTemplate}>
                          <HeaderCell area="gheader" data-test="manager-total-header">
                            Total Contributions:
                          </HeaderCell>
                          <HeaderCell area="cheader" data-test="manager-available-header">
                            Available Balance:
                          </HeaderCell>
                          <Cell area="total" data-test="manager-total-value">
                            {value === undefined || value.totalBalance.lte(0) ? '' : value.totalBalance.toFormat()}
                          </Cell>
                          <Cell area="available" data-test="manager-available-value">
                            {value === undefined || value.totalBalance.lte(0) ? '' : value.balance.toFormat()}
                          </Cell>
                        </StyledGrid>
                      </Cell>
                      <Cell area="button" data-test="manager-setup-button">
                        {value === undefined || value.totalBalance.lt(0) ? (
                          <SetupAddressBox disabled={value === undefined} />
                        ) : (
                          <CollectBox disabled={value.balance.lte(0)} />
                        )}
                      </Cell>
                    </StyledGrid>
                  </Cell>
                  <Cell area="update" data-test="manager-update-button">
                    <MessageBox disabled={value === undefined || value.message === 'Address is not set up'} />
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
