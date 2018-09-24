import { SlotsContainer, TSpinnerState } from '../../containers';
import * as React from 'react';
import { SpinButton } from './SpinButton';
import { SlotSpinners } from './SlotSpinners';
import { Flex } from 'reakit';
import styled from 'styled-components';

export const SlotsApp = () => {
  const StyledContainer = styled(Flex)`
    height: 185px;
    box-shadow: 1px 0 20px lime, 1px 0 80px lime, 1px 0 120px yellow inset;
    border: 2px solid white;
    position: relative;
    border-radius: 1em;
    width: auto;
    display: block;
    white-space: nowrap;
  `;
  const Label1 = styled(Flex)`
    position: relative;
    color: white;
  `;
  const StyledSlotMachineContainer = styled(Flex)`
    position: relative;
    color: white;
  `;
  const amt1 = 3;
  const amt2 = 2;
  const amt3 = 1;
  return (
    <SlotsContainer>
      {({ spin, spinnerState, results, wheels, amount, isWinner }) => (
        <>
          <Label1> Current Jackpot: 8,400,199 ONE</Label1>
          <StyledSlotMachineContainer>
            <StyledContainer>
              <SlotSpinners
                results={results}
                wheels={wheels}
                amount={amount}
                isWinner={isWinner}
                spinningState={spinnerState}
              />
            </StyledContainer>
            <SpinButton clickHandler={spin} spinnerState={spinnerState}>
              Spin! {spinnerState}
            </SpinButton>
          </StyledSlotMachineContainer>
          <Label1> Jackpot: 3x(N)</Label1>
          <Label1> ${amt1}: 2x(N) 1x(?)</Label1>
          <Label1> ${amt2}: 3x(*)</Label1>
          <Label1> ${amt3}: 1x(?) 2x(*)</Label1>

          <Label1> Top Winners </Label1>
          <Label1> Address 1 </Label1>
          <Label1> Address 2 </Label1>
          <Label1> Address 3 </Label1>
        </>
      )}
    </SlotsContainer>
  );
};
