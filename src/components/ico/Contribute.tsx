// tslint:disable no-null-keyword no-any
import { Button, FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Base, Flex, Input, styled } from 'reakit';
import { concat, defer, of } from 'rxjs';
import { prop } from 'styled-tools';
import { WithContracts } from '../../../one/generated';
import { ICOContainer } from '../../containers';
import { Body2 } from '../../elements';
import { ComponentProps } from '../../types';

const StyledFlex = styled(Flex)`
  max-width: 519px;
  padding: 8px 0;
`;

const StyledInput = styled(Input)`
  margin-right: 8px;
  width: 400px;
`;

const StyledBody2 = styled(Body2)`
  ${prop('theme.fonts.axiformaBold')};
  margin-right: 8px;
  white-space: nowrap;
`;

const Wrapper = styled(Base)`
  display: inline-block;
`;

export const Contribute = (props: ComponentProps<typeof Flex>) => (
  <WithContracts>
    {({ ico }) => (
      <FromStream props$={concat(of(new BigNumber(0)), defer(async () => ico.amountPerNEO()))}>
        {(amountPerNEO) => (
          <ICOContainer>
            {({ text, amount, loading, onChangeAmount, send }) => (
              <Wrapper>
                <StyledFlex {...props}>
                  <StyledInput
                    data-test="contribute-input"
                    value={text}
                    placeholder="Send NEO"
                    onChange={(event: React.SyntheticEvent<any>) => onChangeAmount(event.currentTarget.value)}
                  />
                  <StyledBody2 data-test="contibute-amount">
                    = {amount === undefined ? '0' : `${amountPerNEO.times(amount).toFormat()}`} ONE
                  </StyledBody2>
                </StyledFlex>
                <Flex justifyContent="flex-end">
                  <Button data-test="contribute-button" disabled={amount === undefined || loading} onClick={send}>
                    Send
                  </Button>
                </Flex>
              </Wrapper>
            )}
          </ICOContainer>
        )}
      </FromStream>
    )}
  </WithContracts>
);
