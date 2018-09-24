import React, { MouseEvent, ReactNode, SFC } from 'react';
import { TSpinnerState } from '../../containers/SlotsContainer';

type SpinButtonProps = {
  clickHandler: (e: MouseEvent<HTMLElement>) => void;
  spinnerState: TSpinnerState;
  children?: ReactNode;
};

export const SpinButton: SFC<SpinButtonProps> = ({ clickHandler, spinnerState, children }) => (
  <button
    style={{ margin: '.5em', fontSize: '2em', borderRadius: '.5em' width: '100%'}}
    onClick={clickHandler}
    disabled={spinnerState !== TSpinnerState.RESTING}
  >
    {children}
  </button>
);
