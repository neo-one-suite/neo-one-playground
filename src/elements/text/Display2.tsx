import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H1 = Heading.as('h1');
export const Display2 = styled(H1)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 2.8125rem;
  line-height: 1.06666em;
  text-align: left;
  margin: 0;
`;
