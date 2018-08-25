import { Heading, styled } from 'reakit';
import { prop } from 'styled-tools';

const H4 = Heading.as('h4');
export const Subheading = styled(H4)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 1rem;
  line-height: 1.5em;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 0;
`;
