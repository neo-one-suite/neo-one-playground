import { Flex, styled } from 'reakit';
import { prop } from 'styled-tools';

export const ContentWrapper = styled(Flex)`
  align-items: center;
  ${prop('theme.maxWidth')};
  padding: 0 16px;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;
