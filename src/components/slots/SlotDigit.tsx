import * as React from 'react';
import { Flex, styled } from 'reakit';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2, Logo } from '../../elements';

const Header = styled(Display2)`
  color: ${prop('theme.gray0')};
`;

const FlexBackground = Flex.as(Background);
const StyledSlotDigit = styled(FlexBackground)`
  justify-content: center;
  height: 1.8em;
  width: 100%;
  color: white;
  font-size: 3em;
`;
interface Props {
  val: string;
}
export class SlotDigit extends React.Component<Props> {
  public render() {
    console.log('%c, Spin is: ', 'color: white; background-color: red;');
    return (
      <StyledSlotDigit className="ezslots2">
        <ContentWrapper justifyContent="center">
          <Logo />
        </ContentWrapper>
      </StyledSlotDigit>
    );
  }
}
