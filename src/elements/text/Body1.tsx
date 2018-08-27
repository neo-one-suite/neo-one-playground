import { Base, styled } from 'reakit';
import { prop } from 'styled-tools';

export const Body1 = styled(Base)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 0.875rem;
  line-height: 1.46428em;
  text-align: left;
  margin: 0;
`;
