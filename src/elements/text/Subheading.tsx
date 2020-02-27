import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import { prop } from 'styled-tools';

export const Subheading = styled(Box)`
  ${prop('theme.fonts.axiformaRegular')};
  font-size: 1rem;
  line-height: 1.5em;
  text-align: left;
  margin: 0;
`;
