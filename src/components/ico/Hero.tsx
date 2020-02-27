import styled from '@emotion/styled';
import * as React from 'react';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2 } from '../../elements';

const Header = styled(Display2)`
  color: ${prop('theme.gray0')};
`;

const FlexBackground = styled(Background)`
  display: flex;
`;

const StyledBackground = styled(FlexBackground)`
  justify-content: center;
  height: 200px;
  width: 100%;
`;

export function Hero() {
  return (
    <StyledBackground>
      <ContentWrapper justifyContent="center">
        <Header data-test="hero-text">The One ICO</Header>
      </ContentWrapper>
    </StyledBackground>
  );
}
