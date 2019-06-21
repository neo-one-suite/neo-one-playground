import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H2 = Heading.as('h2');
// tslint:disable-next-line no-any
export const Display1 = styled(H2 as any)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 2.125rem;
  line-height: 1.20588em;
  text-align: left;
  margin: 0;
`;
