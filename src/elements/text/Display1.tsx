import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H2 = Heading.as('h2');
export const Display1 = styled(H2)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 2.125rem;
  line-height: 1.20588em;
  margin-left: -0.04em;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 0;
`;
