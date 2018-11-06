import { Flex, styled } from 'reakit';
import { prop, switchProp } from 'styled-tools';

export type BackgroundColors = 'dark' | 'light' | 'darkLight' | 'gray5';

export const SectionContentWrapper = styled(Flex)<{ readonly bg: BackgroundColors }>`
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
