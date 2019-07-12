import * as React from 'react';
import { Flex, styled } from 'reakit';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2 } from '../../elements';

const Header = styled(Display2)`
  color: ${prop('theme.gray0')};
`;

const FlexBackground = Flex.as(Background);
// tslint:disable-next-line no-any
const StyledBackground = styled(FlexBackground as any)`
  justify-content: center;
  height: 200px;
  width: 100%;
`;

export function Hero() {
  return (
    <StyledBackground>
      <ContentWrapper justifyContent="center">
        <Header data-test="hero-text">The One Gas Vacuum</Header>
      </ContentWrapper>
    </StyledBackground>
  );
}
