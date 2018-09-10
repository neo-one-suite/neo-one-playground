import * as React from 'react';
import { Flex, styled } from 'reakit';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2 } from '../../elements';
import { SlotDigit } from './SlotDigit';
import BigNumber from 'bignumber.js';
import { Logo } from '../../elements';
import jqrya from '../../../root/js/jquery-1.11.3.js';
import css from '../../../root/css/ezslots.css';
import jqryb from '../../../root/js/ezslots2.js';
import jqryc from '../../../root/js/jquery.easing.1.3.js';

const Header = styled(Display2)`
  color: ${prop('theme.gray0')};
`;

const FlexBackground = Flex.as(Background);
const StyledBackground = styled(FlexBackground)`
  justify-content: center;
  height: 90px;
  margin-top: -3em;
  width: 14%;
  display: inline-block;
`;

interface Props {
  readonly spin: () => void;
}

export class SlotsResult extends React.Component<Props> {
  public render() {
    const spins = ['6', '5', '4', '3', '2', '1'];
    console.log(`%c, Spin is: ${spins}`, 'color: white; background-color: red;');
    return (
      <div id="ezslots2">
        {spins.map((res, idx) => (
          <StyledBackground key={idx}>
            <SlotDigit val={res} />
            <Logo />
          </StyledBackground>
        ))}
      </div>
    );
  }
}
