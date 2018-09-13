import * as React from 'react';
import { styled, Flex, keyframes } from 'reakit';

const rootElement = document.getElementById('root');

const StyledIcons = styled(Flex)`
  display: inline-block;
  width: 128px;
  height: 564px;
  overflow: hidden;
  background: #fff url(img/slots_sprite.png) repeat-y;
  will-change: backgroundPosition;
  transition: 0.3s background-position ease-in-out;
  padding: 0 80px;
  transform: translateZ(0);
`;

const RepeatButtonStyles = styled(Flex)`
  appearance: none;
  border: none;
  background: url(https://andyhoffman.codes/random-assets/img/slots/repeat.png) transparent 0 0 no-repeat;
  background-size: cover;
  width: 48px;
  height: 48px;
  position: absolute;
  z-index: 100;
  top: 20px;
  right: -8em;
  cursor: pointer;
`;
const SpinnerContainer = styled(Flex)`
  overflow: hidden;
  box-sizing: border-box;
  height: 220px;
  padding: 2em;
  margin-bottom: 3em;
  background-color: #00ff9c;
  transform: translate(-50%, -50%) scale(0.62, 0.62);
  position: absolute;
  top: 3em;
  left: 50%;
  display: flex;
  transition: 0.3s transform;
`;

const GradientFadeOut = styled(Flex)`
  position: absolute;
  top: 32px;
  right: 32px;
  bottom: 0;
  left: 32px;
  background: linear-gradient(
    to bottom,
    rgba(64, 64, 64, 1) 0%,
    rgba(64, 64, 64, 0) 7%,
    rgba(64, 64, 64, 0) 93%,
    rgba(64, 64, 64, 1) 100%
  );
`;

const MachineContainer = styled(Flex)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: 20em;
  top: 10em;
  right: 32px;
  bottom: 0;
  left: 32px;
`;

function WinningSound() {
  return (
    <audio className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}
interface RepeatButtonProps {
  onClick: () => void;
}
const RepeatButton = (props: RepeatButtonProps) => (
  <RepeatButtonStyles aria-label="Play again." id="repeatButton" onClick={props.onClick} />
);

interface SlotMachineProps {
  winner: number[];
  results: number[];
}

export class SlotMachine extends React.Component<SlotMachineProps> {
  slotWindows: Spinner[];
  matches: number[];
  results: number[];

  constructor(props: SlotMachineProps) {
    super(props);
    this.slotWindows = [];
    this.matches = [];
    this.results = props.results;

    this.finishHandler = this.finishHandler.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.render = this.render.bind(this);
  }

  protected updateDisplay() {
    this.setState({ winner: null });
    this.emptyArray();
    if (this.slotWindows != null) {
      this.slotWindows.map((swindow) => swindow.forceUpdateHandler());
    }
  }

  static matches = [];

  finishHandler(value: number) {
    this.matches.push(value);

    if (this.matches.length === 3) {
      const first = this.matches[0];
      let results = this.matches.every((match) => match === first);
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    this.matches = [];
  }

  render() {
    const { winner, results } = this.props;
    console.log('props look like this');
    console.log(this.props);
    const getLoser = () => {
      return 'oi';
    };
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.updateDisplay} />;
    }
    const winningScore = -1;

    if (winner === -1) {
      winningSound = <WinningSound />;
    }
    return (
      <MachineContainer>
        {winningSound}
        <h1 style={{ color: 'white' }}>
          <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
        </h1>
        {repeatButton}
        <SpinnerContainer>
          {results.map((result, idx) => (
            <Spinner
              onFinish={this.finishHandler}
              ref={(child) => {
                if (child) this.slotWindows.push(child);
              }}
              result={result}
              offset={offset}
              key={idx}
            />
          ))}
          <GradientFadeOut />
        </SpinnerContainer>
      </MachineContainer>
    );
  }
}
interface SpinnerProps {
  onFinish: (a: number) => void;
  result: number;
  offset: number;
}
interface SpinnerState {
  timeRemaining: number;
  position: number;
}
class Spinner extends React.Component<SpinnerProps> {
  timer?: NodeJS.Timer;
  state: SpinnerState;
  constructor(props: SpinnerProps) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      position: 0,
      timeRemaining: 0,
    };
  }

  forceUpdateHandler() {
    this.reset();
  }

  endSpin(results) {
    // if results undefined display:
    //     !  ?  !
    // on the spinner.
    // add/subtract from the start position
  }

  spinToErrorState() {}

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition.bind(this);
    console.log('%c,  is where I am... ', 'background-color: green; color: white;');
    this.setState({
      position: this.start,
      timeRemaining: this.props.result,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  static iconHeight = 188;

  start = this.setStartPosition();
  speed = Spinner.iconHeight;

  setStartPosition() {
    const retv = Math.floor(this.props.result * (9 * this.props.offset) * Spinner.iconHeight * -1);
    console.log(
      'SlotMachine.tsx: class Spinner: setStartPosition(): this.props.result: this.props.result * (9 * this.props.offset) * Spinner.iconHeight  ' +
        retv,
    );
    return retv;
    l;
  }

  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    });
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 9;
    const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
    let moved = 0;
    console.log('SlotMachine.tsx: class Spinner: getSymbolFromPosition(): this.props.result: ' + this.props.result);
    if (this.props.result) {
      moved = this.props.result / 100;
    }
    let startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = currentPosition % maxPosition;
      }
    }

    this.props.onFinish(currentPosition);
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      if (this.timer) clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  componentDidMount() {
    if (this.timer) clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.result,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  render() {
    let { position } = this.state;

    return <StyledIcons style={{ backgroundPosition: '0 ' + position + 'px' }} />;
  }
}

/*


h1 {
  font-size: 150%;
  padding: 0.25em .5em;
  font-family: 'Cairo', sans-serif;
}

h1 span {
  color: aliceblue;
  border: 1px solid hsla(208, 100%, 97.1%, .2);
  padding: 0.1em .2em;
}


.icons:nth-child(2) {
  margin: 0 10px;
}

* { box-sizing: border-box; }


.app-wrap.winner-false {
  animation: linear 1s spin;
}

.spinner-container::after {
  position: absolute;
  content: '';
  display: block;
  height: 180px;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  left: 30px;
  background: rgba(255, 0, 0, .1);
}


*/
