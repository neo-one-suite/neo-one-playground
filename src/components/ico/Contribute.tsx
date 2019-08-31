// tslint:disable no-null-keyword no-any
import { FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Box, Flex, styled } from 'reakit';
import { concat, defer, of } from 'rxjs';
import { prop } from 'styled-tools';
import { WithContracts } from '../../neo-one';
import { PatchedButton, PatchedTextInput } from '../../components';
import { ICOContainer } from '../../containers';
import { Body2 } from '../../elements';
import { ComponentProps } from '../../types';

const StyledFlex = styled(Flex)`
  max-width: 519px;
  padding: 8px 0;
`;

const StyledInput = styled(PatchedTextInput)`
  width: 400px;
`;

const StyledBody2 = styled(Body2)`
  ${prop('theme.fonts.axiformaBold')};
  margin-right: 8px;
  margin-left: 8px;
  white-space: nowrap;
`;

const Wrapper = styled(Box)`
  display: inline-block;
`;

export const Contribute = (props: ComponentProps<typeof Flex>) => (
  <WithContracts>
    {({ one }) => (
      <FromStream
        props={[one]}
        createStream={() => concat(of(new BigNumber(0)), defer(async () => one.amountPerNEO()))}
      >
        {(amountPerNEO) => (
          <ICOContainer>
            {({ text, amount, loading, onChangeAmount, send }) => (
              <Wrapper>
                <StyledFlex {...props}>
                  {/*
                  // @ts-ignore */}
                  <StyledInput
                    data-test="contribute-input"
                    value={text}
                    placeholder="Send NEO"
                    onChange={(event: React.SyntheticEvent<any>) => onChangeAmount(event.currentTarget.value)}
                  />
                  <StyledBody2 data-test="contribute-amount">
                    = {amount === undefined ? '0' : `${amountPerNEO.times(amount).toFormat()}`} ONE
                  </StyledBody2>
                </StyledFlex>
                <Flex justifyContent="flex-end">
                  {/*
                  // @ts-ignore */}
                  <PatchedButton
                    data-test="contribute-button"
                    disabled={amount === undefined || loading}
                    onClick={send}
                  >
                    Send
                  </PatchedButton>
                </Flex>
              </Wrapper>
            )}
          </ICOContainer>
        )}
      </FromStream>
    )}
  </WithContracts>
);
