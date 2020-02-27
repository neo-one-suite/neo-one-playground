import styled from '@emotion/styled';
import { Box, Toolbar, ToolbarContent, ToolbarFocusable } from '@neo-one/react-core';
import React from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { NavLink as RouterLink } from 'react-router-dom';
import { prop } from 'styled-tools';
import { Link, Logo } from '../elements';
import { ComponentProps } from '../types';

const Flex = styled(Box)`
  display: flex;
`;

const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: center;
  background-color: ${prop('theme.primary')};
  z-index: 9999;
  padding: 0 36px;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  height: 100%;
  grid-gap: 8px;
  padding: 0 16px;
  max-width: 1132px;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const LogoLink = styled(RouterLink)`
  display: block;
  width: 100px;
  margin-right: 36px;
  margin-bottom: 8px;
  margin-top: 8px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const NavigationLink = styled(RouterLink)`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  font-size: 20px;
  height: 100%;
  padding-top: 5px;
  border-bottom: 5px solid transparent;
  color: ${prop('theme.black')};
  text-decoration: none;

  &:hover {
    border-color: ${prop('theme.accent')};
    color: ${prop('theme.accent')};
  }

  &.active {
    border-color: ${prop('theme.accent')};
  }
`;

const StyledToolbarLink = styled(ToolbarFocusable.withComponent(Link))`
  outline: none;
`;

const StyledToolbarNavLink = styled(ToolbarFocusable.withComponent(NavigationLink))`
  outline: none;
`;

const StyledToolbarLogoLink = styled(ToolbarFocusable.withComponent(LogoLink))`
  outline: none;
`;

export const Header = (props: ComponentProps<typeof Wrapper>) => (
  <Wrapper {...props}>
    <StyledToolbar>
      <ToolbarContent>
        <StyledToolbarLogoLink data-test="header-logo" to="/">
          <Logo />
        </StyledToolbarLogoLink>
        <StyledToolbarNavLink data-test="header-ico" to="/ico">
          ICO
        </StyledToolbarNavLink>
        <StyledToolbarNavLink data-test="header-gasvac" to="/gasvac">
          GASVac
        </StyledToolbarNavLink>
        <StyledToolbarNavLink data-test="header-escrow" to="/escrow">
          Escrow
        </StyledToolbarNavLink>
        <StyledToolbarNavLink data-test="header-smart-donation" to="/smart-donation">
          Smart Donation
        </StyledToolbarNavLink>
      </ToolbarContent>
      <ToolbarContent align="end">
        <StyledToolbarLink
          ping
          data-test="header-github"
          href="https://github.com/neo-one-suite/neo-one-playground"
          target="_blank"
        >
          GitHub
          <MdOpenInNew />
        </StyledToolbarLink>
      </ToolbarContent>
    </StyledToolbar>
  </Wrapper>
);
