import * as React from 'react';
import { Base, styled } from 'reakit';
import { prop } from 'styled-tools';

const Wrapper = styled(Base)`
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
