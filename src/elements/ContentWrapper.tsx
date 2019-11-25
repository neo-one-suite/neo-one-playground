import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import { prop } from 'styled-tools';

export type FlexJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export const ContentWrapper = styled(Box)<
  { readonly justifyContent?: FlexJustifyContent; readonly flexDirection?: FlexDirection },
  {}
>`
  display: flex;
  align-items: center;
  justify-content: ${prop('justifyContent')};
  flex-direction: ${prop('flexDirection')};
  ${prop('theme.maxWidth')};
  padding: 0 16px;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;
