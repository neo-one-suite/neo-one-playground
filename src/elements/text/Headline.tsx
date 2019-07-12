import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H3 = Heading.as('h3');
// tslint:disable-next-line no-any
export const Headline = styled(H3 as any)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 1.5rem;
  line-height: 1.35416em;
  text-align: left;
  margin: 0;
`;
