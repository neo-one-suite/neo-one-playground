import React from 'react';
import { Flex, styled } from 'reakit';
import { TSpinnerState as SpinState } from '../../containers/SlotsContainer';

export interface SpinnerProps {
  result: number;
  key: number;
  spinningState: SpinState;
}

export class Spinner extends React.Component<SpinnerProps> {
  static iconHeight = 188;
  timer?: NodeJS.Timer;
  timeRemaining: number;
  stepSize: number;
  position: number;
  offset: number;
  msInterval = 50;

  constructor(props: SpinnerProps) {
    super(props);
    console.log('%c, SPINNER CONSTRUCTOR ', 'background-color:yellow');
    this.position = 0;
    this.timeRemaining = 0;
    this.offset = Spinner.iconHeight * Math.floor((Math.random() * 10) % 10);
    this.stepSize = 20;
  }

  private startTimer = () => {
    console.log(' Starting Timer ');
    if (this.timer) {
      this.stopTimer();
    }

    this.offset = Math.floor((Math.random() * 10) % 10);
    this.position = Spinner.iconHeight * this.offset;
    this.timer = setInterval(() => {
      this.tick();
    }, this.msInterval);
  };

  private stopTimer = () => {
    console.log(` Stop Timer ${this.timeRemaining}`);
    if (this.timer) {
      console.log(' There is a timer to stop ');
      clearInterval(this.timer);
      this.timer = undefined;
    }
  };

  private isRunning = () => {
    return this.timeRemaining > 0 && this.props.spinningState !== SpinState.RESTING ? true : false;
  };

  private tick = () => {
    //console.log(`*tick* (${this.timeRemaining})`);
    if (this.isRunning() === false) {
      this.stopTimer();
      return;
    }
    if (this.props.key === 1) console.log('Tick');
    this.updateStepSize();
    this.updatePosition();
    this.reduceTimeRemaining();
    this.forceUpdate();
  };
  private updateStepSize() {
    this.stepSize = (Math.floor(this.timeRemaining / 100) % 5) * (Spinner.iconHeight / 100);
    if (this.props.key === 1) console.log(' STEP SIZE ' + this.stepSize);
  }

  private reduceTimeRemaining() {
    this.timeRemaining = this.timeRemaining - this.msInterval;
    console.log(this.timeRemaining);
  }

  private updatePosition() {
    this.position = this.position - (Spinner.iconHeight + this.stepSize) / 10;
  }

  render() {
    console.log('Spinning State ' + this.props.spinningState);
    if (this.props.spinningState == SpinState.SPINNING && !this.timer) {
      this.timeRemaining = 4000;
      console.log('%c, Triggering START TIMER ', 'background-color:purple; color: white');
      this.startTimer();
    } else if (this.props.spinningState === SpinState.RESTING) {
      this.stopTimer();
    }
    const { result } = this.props;
    const spinState = SpinState.SPINNING;
    const motionBlur = spinState === SpinState.SPINNING ? 2 : 0;
    const PositionedSpinner = styled(Flex)`
      background-image: url('/img/slots_sprite.png');
      background-position: 0 ${this.position}px;
      background-repeat: repeat-y;
      min-width: 90px;
      -webkit-filter: blur(${motionBlur}px);
      background-size: cover;
      height: 150px;
      margin: 0 1em;
      position: relative;
      padding: 0;
      transition: background-position 1s;
    `;

    return <PositionedSpinner> </PositionedSpinner>;
  }
}

/*
  Add Interval

*/
