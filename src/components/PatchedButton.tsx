import { Button } from '@neo-one/react-core';
import styled from 'styled-components';
import { theme } from '../theme';

export const PatchedButton = styled(Button)`
  background-color: ${theme.accent};
  color: ${theme.gray5};
  &:hover {
    background-color: ${theme.primaryLight};
  }
  &:active {
    background-color: ${theme.primaryLight};
  }
  &:focus {
    background-color: ${theme.primaryLight};
  }
`;
