import { Button, FromStream } from '@neo-one/react';
import BigNumber from 'bignumber.js';
import * as React from 'react';
import { Base, Flex, Input, styled } from 'reakit';
import { prop } from 'styled-tools';
import { WithContracts } from '../../one/generated';
import { Hero, Participate } from '../components/ico';
import { SlotMachine } from '../components/slots';

import { SlotsContainer } from '../containers';
import { Body2 } from '../elements';
import { ComponentProps } from '../types';

const Wrapper = styled(Base)`
  display: inline-block;
`;
const StyledFlex = styled(Flex)`
  top: 14em;
  position: relative;
  max-width: 519px;
  padding: 8px 0;
`;

const StyledButton = styled(Button)`
  margin: 0 1em;
  display: inline-block;
  position: relative;
`;

const StyledInput = styled(Input)`
  margin-right: 8px;
  width: 15em;
`;

const StyledActionTray = styled(Flex)`
  position: relative;
  margin-top: 4em;
  padding: 2em;
`;

const StyledBody2 = styled(Body2)`
  ${prop('theme.fonts.axiformaBold')};
  margin-right: 8px;
  white-space: nowrap;
`;
const amount = 1;
const loading = 1;
const address = '123.234';

export const Slots = (props: ComponentProps<typeof Flex>) => {
  return (
    <>
      <Hero text="Progressive Slots" />

      <WithContracts>
        {({ slots, client }) => (
          <SlotsContainer>
            {({ loading, onChangeAmount, spin, spinning, address, results }) => (
              <Wrapper>
                <SlotMachine results={results} />
                <StyledActionTray justifyContent="center">
                  <StyledButton
                    data-test="contribute-button1"
                    disabled={spinning}
                    onClick={() => spin(new BigNumber('1'), address)}
                  >
                    1 Token Spin
                  </StyledButton>
                  <StyledButton
                    data-test="contribute-button2"
                    disabled={spinning}
                    onClick={() => spin(new BigNumber('2'), address)}
                  >
                    2 Token Spin
                  </StyledButton>
                  <StyledButton
                    data-test="contribute-button5"
                    disabled={spinning}
                    onClick={() => spin(new BigNumber('5'), address)}
                  >
                    5 Token Spin
                  </StyledButton>
                </StyledActionTray>
              </Wrapper>
            )}
          </SlotsContainer>
        )}
      </WithContracts>

      <Participate />
    </>
  );
};
