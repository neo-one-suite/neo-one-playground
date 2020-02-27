import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import React from 'react';
import { ifProp, prop } from 'styled-tools';
import { Footer, Header } from '../components';
import { ScrollContainer } from '../containers';
import { ComponentProps } from '../types';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${prop('theme.black')};
  color: ${prop('theme.black')};
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const StyledHeader = styled(Header)<{ readonly shadowed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  ${ifProp('shadowed', 'box-shadow: 0 0 1px rgba(0, 0, 0, 0.25)')};
`;

const Content = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 72px 0;
  width: 100%;
`;

const StyledFooter = styled(Footer)`
  margin-top: auto;
`;

interface Props {
  readonly children: React.ReactNode;
}
export const CoreLayout = ({ children, ...props }: Props & ComponentProps<typeof Wrapper>) => (
  <Wrapper {...props}>
    <ScrollContainer>{({ y }) => <StyledHeader shadowed={y > 0} />}</ScrollContainer>
    <Content>{children}</Content>
    <StyledFooter />
  </Wrapper>
);
