import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import { prop, switchProp } from 'styled-tools';
import { FlexDirection } from './ContentWrapper';

export type BackgroundColors = 'dark' | 'light' | 'darkLight' | 'gray5';

export const SectionContentWrapper = styled(Box)<
  { readonly bg: BackgroundColors; readonly flexDirection?: FlexDirection },
  {}
>`
  display: flex;
  flex-direction: ${prop('flexDirection')};
  /* stylelint-disable-next-line */
  background-color: ${switchProp('bg', {
    dark: prop('theme.black'),
    light: prop('theme.gray0'),
    darkLight: prop('theme.gray2'),
    gray5: prop('theme.gray5'),
  })};
  width: 100%;
  justify-content: center;

  & > div {
    width: 100%;
    padding: 48px 16px;
    ${prop('theme.maxWidth')};

    @media (max-width: 768px) {
      padding: 16px 8px;
    }
  }
`;
