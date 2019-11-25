import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2, Headline } from '../../elements';

const Grid = styled(Box)`
  display: grid;
  width: 100%;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const StyledBackground = styled(Background)`
  display: flex;
  color: ${prop('theme.gray0')};
  justify-content: center;
  height: 240px;
  width: 100%;
`;

const StyledDisplay2 = styled(Display2)`
  color: ${prop('theme.primary')};
`;

export function Hero() {
  return (
    <StyledBackground>
      <ContentWrapper justifyContent="center">
        <Grid>
          <div>
            <StyledDisplay2>NEO•ONE</StyledDisplay2>
            <StyledDisplay2>Playground</StyledDisplay2>
          </div>
          <Headline alignSelf="start" justifySelf="start">
            Welcome to the Playground! Take a tour of NEO•ONE's features and then check out the demo applications.
          </Headline>
        </Grid>
      </ContentWrapper>
    </StyledBackground>
  );
}
