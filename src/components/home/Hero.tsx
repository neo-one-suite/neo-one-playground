import * as React from 'react';
import { Flex, Grid, styled } from 'reakit';
import { prop } from 'styled-tools';
import { Background, ContentWrapper, Display2, Headline } from '../../elements';

const FlexBackground = Flex.as(Background);
// tslint:disable-next-line no-any
const StyledBackground = styled(FlexBackground as any)`
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
        <Grid gap={24} columns="1fr 1fr" justifyItems="center" alignItems="center" width="100%">
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
