import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H3 = Heading.as('h3');
export const Headline = styled(H3)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 1.5rem;
  line-height: 1.35416em;
  margin-left: -0.04em;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 0;
`;
