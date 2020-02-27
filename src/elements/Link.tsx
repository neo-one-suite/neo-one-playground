import styled from '@emotion/styled';
import { LinkBase } from '@neo-one/react-core';
import { prop } from 'styled-tools';

export const Link = styled(LinkBase)`
  color: ${prop('theme.gray6')};
  ${prop('theme.fonts.axiformaBold')};
  font-size: 14px;
  justify-self: flex-end;

  &:hover {
    color: ${prop('theme.primaryDark')};
    text-decoration: none;
  }
`;
