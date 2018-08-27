import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H2 = Heading.as('h2');
export const Display1 = styled(H2)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 2.125rem;
  line-height: 1.20588em;
  text-align: left;
  margin: 0;
`;
