import React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { Flex, Heading, Link as LinkBase, styled, Toolbar } from 'reakit';
import { prop } from 'styled-tools';
import { Link, Logo } from '../elements';
import { ComponentProps } from '../types';

const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: center;
  background-color: ${prop('theme.primary')};
  z-index: 9999;
  padding: 12px 36px;

  @media (max-width: 768px) {
    padding: 12px 8px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  height: 100%;
  grid-gap: 8px;
  padding: 0 24px;
  ${prop('theme.maxWidth')};

  ${/* sc-sel */ Toolbar.Focusable} {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const LogoLink = styled(LinkBase)`
  display: block;
  width: 100px;
  margin-right: 36px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const StyledHeading = styled(Heading)`
  font-size: 2.125rem;
  line-height: 1.20588em;
  width: 272px;
`;

export const Header = (props: ComponentProps<typeof Wrapper>) => (
  <Wrapper {...props}>
    <StyledToolbar>
      <Toolbar.Content>
        <Toolbar.Focusable as={LogoLink} href="https://neo-one.io" target="_blank">
          <Logo />
        </Toolbar.Focusable>
      </Toolbar.Content>
      <Toolbar.Content align="center">
        <StyledHeading>ICO Playground</StyledHeading>
      </Toolbar.Content>
      <Toolbar.Content align="end">
        <Toolbar.Focusable as={Link} href="https://github.com/neo-one-suite/neo-one-ico" target="_blank">
          GitHub
          <MdOpenInNew />
        </Toolbar.Focusable>
      </Toolbar.Content>
    </StyledToolbar>
  </Wrapper>
);
