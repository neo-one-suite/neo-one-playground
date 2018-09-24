import React, { PureComponent } from 'react';
import { Spinner, SpinnerProps } from './Spinner';
import { Flex, styled } from 'reakit';
import { TSpinnerState } from '../../containers/SlotsContainer';

const defaultWheelCount = 3;

const defaultProps = {
  results: [...Array(defaultWheelCount).keys()].map(() => -1),
  isWinner: false,
  wheels: 3,
  amount: 0,
  spinningState: TSpinnerState.RESTING,
};

const StandardSlot = styled(Flex)`
  height: 100%;
  display: block;
  border-radius: 1em;
  overflow: hidden;
`;

export type SlotSpinnerProps = {
  results: number[];
  isWinner: boolean;
  wheels: number;
  amount: number;
  spinningState: TSpinnerState;
  spinners?: SpinnerProps[];
};

export const SlotSpinners = (props: SlotSpinnerProps = defaultProps) => {
  // How To make Props work?!
  // const { isWinner, results, spinningState } = this.props;
  const isWinner = false;

  console.log('props look like this');
  console.log(props);
  let winningSound = null;

  const winningScore = -2;

  if (isWinner) {
    winningSound = <WinningSound />;
  }
  return (
    <StandardSlot>
      {props.results.map((result: number, idx: number) => (
        <Spinner result={result} key={idx} spinningState={props.spinningState} />
      ))}
    </StandardSlot>
  );
};

// How to set Autoplay?
function WinningSound() {
  return (
    <audio autoplay="autoplay" className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}
