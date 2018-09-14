import * as React from 'react';
import { Box, styled } from 'reakit';
import { prop } from 'styled-tools';

const Wrapper = styled(Box)`
  ${prop('theme.fonts.axiformaBold')};
  font-size: 1rem;
  line-height: 1.5em;
  text-align: left;
  margin: 0;
  display: inline-block;
`;
export function TryItOut() {
  return <Wrapper>Try it out!</Wrapper>;
}
