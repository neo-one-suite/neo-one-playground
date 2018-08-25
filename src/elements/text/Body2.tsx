import { Base, styled } from 'reakit';
import { prop } from 'styled-tools';

export const Body2 = styled(Base)`
  ${prop('theme.fonts.axiformaMedium')};
  font-size: 0.875rem;
  line-height: 1.71428em;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 0;
`;
