import { Base, styled } from 'reakit';
import { prop } from 'styled-tools';

export const Subheading = styled(Base)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 1rem;
  line-height: 1.5em;
  text-align: left;
  margin: 0;
`;
