import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import { prop } from 'styled-tools';

export const Body1 = styled(Box)`
  ${prop('theme.fonts.axiformaRegular')};
  ${prop('theme.fontStyles.body1')};
  margin: 0;
`;
