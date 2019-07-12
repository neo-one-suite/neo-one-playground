import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H1 = Heading.as('h1');
// tslint:disable-next-line no-any
export const Display2 = styled(H1 as any)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 2.8125rem;
  line-height: 1.06666em;
  text-align: left;
  margin: 0;
`;
