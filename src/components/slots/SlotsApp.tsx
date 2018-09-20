import { SlotsContainer, TSpinnerState } from '../../containers';
import * as React from 'react';
import { SpinButton } from './SpinButton';
import { SlotSpinners } from './SlotSpinners';

export const SlotsApp = () => (
  <SlotsContainer>
    {({ spin, spinnerState, results, amount, isWinner }) => (
      <>
        <SlotSpinners results={results} amount={amount} isWinner={isWinner} spinningState={spinnerState} />
        <SpinButton clickHandler={spin} spinnerState={spinnerState}>
          Spin! {spinnerState}
        </SpinButton>
      </>
    )}
  </SlotsContainer>
);
