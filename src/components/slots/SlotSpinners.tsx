import React, { PureComponent } from 'react';
import { Spinner, SpinnerProps } from './Spinner';
import { Flex, styled } from 'reakit';
import { TSpinnerState } from '../../containers/SlotsContainer';

const defaultProps = {
  results: [],
  isWinner: false,
  amount: 0,
  spinningState: TSpinnerState.RESTING,
};

const StandardSlot = styled(Flex)`
  min-width: 330px;
  width: 33%;
  max-width: 800px;
  position: relative;
  padding: 0;
`;

export type SlotSpinnerProps = {
  results: number[];
  isWinner: boolean;
  amount: number;
  spinningState: TSpinnerState;
  spinners?: SpinnerProps[];
};

export const SlotSpinners = (props: SlotSpinnerProps = defaultProps) => {
  // How To make Props work?!
  // const { isWinner, results, spinningState } = this.props;
  const results = [1, 2, 3];
  const isWinner = true;

  console.log('props look like this');
  console.log(props);
  let winningSound = null;

  const winningScore = -1;

  if (isWinner) {
    winningSound = <WinningSound />;
  }
  return (
    <StandardSlot>
      {results.map((result: number, idx: number) => (
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
