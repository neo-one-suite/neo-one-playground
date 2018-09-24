import React from 'react';
import { Flex } from 'reakit';
import styled, { keyframes } from 'styled-components';
import { TSpinnerState as SpinState } from '../../containers/SlotsContainer';

export interface SpinnerProps {
  result: number;
  key: number;
  spinningState: SpinState;
}

const kfSpin = () => {
  return keyframes`
  5%, 20%, 40%{
    -webkit-filter: blur(6px);
  }
  3%, 7%, 18%, 22%, 38%, 42%%, 60%{
    -webkit-filter: blur(3px);
  }
  0%, 10%, 30%, 50%, 70%, 100%{
    -webkit-filter: blur(0);
  }
  0% {
    background-position: 0 -${750 * Math.ceil(Math.random() * 10)}px;
  }
  10% {
    background-position: 0 ${500 * Math.ceil(Math.random() * 10)}px;
  }
  30% {
    background-position: 0 -${300 * Math.ceil(Math.random() * 10)}px;
  }
  50% {
    background-position: 0 ${100 * Math.ceil(Math.random() * 10)}px;
  }
  70% {
    background-position: 0 -${10 * Math.ceil(Math.random() * 10)}px;
  }
  100% {
    background-position: 0 0;
  }
`;
};
const sampleSpin = kfSpin();
export class Spinner extends React.Component<SpinnerProps> {
  static iconHeight = 188;
  stepSize: number;
  position: number;
  offset: number;
  kfSpin: typeof sampleSpin;

  constructor(props: SpinnerProps) {
    super(props);
    //    console.log('%c, SPINNER CONSTRUCTOR ', 'background-color:yellow');
    this.position = 0;
    this.offset = Spinner.getRandomOffset();
    this.stepSize = 20;
    this.kfSpin = kfSpin();
  }

  static getRandomOffset(): number {
    const offset = Spinner.iconHeight * Math.floor((Math.random() * 10) % 10);
    //    console.log(`Offset: ${offset}`);
    return offset;
  }

  getResultOffset() {
    const res = this.props.result > 0 ? this.props.result : 1;
    return (res % 10) * Spinner.iconHeight + 20;
  }
  render() {
    const animation =
      this.props.spinningState !== SpinState.RESTING
        ? `
    animation: ${this.kfSpin} 10s ease 1 normal forwards;
    `
        : '';
    const PositionedSpinner = styled(Flex)`
      background-image: url('/img/slots_sprite.png');
      background-repeat: repeat-y;
      transition: margin-top 3s;
      ${animation} display: inline-block;
      background-size: contain;
      position: relative;
      width: 150px;
      padding: 10px;
      height: 2500px;
      color: white;
      top: -${this.getResultOffset()}px;
    `;
    return <PositionedSpinner />;
  }
}
