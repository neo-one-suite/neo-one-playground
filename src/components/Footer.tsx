import styled from '@emotion/styled';
import { Box, List, Paragraph } from '@neo-one/react-core';
import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { prop } from 'styled-tools';
import { ContentWrapper, Link } from '../elements';
import { ComponentProps } from '../types';

const year = new Date().getFullYear();

const StyledParagraph = styled(Paragraph)`
  /* empty block */
`;

const Flex = styled(Box)`
  display: flex;
`;

const Grid = styled(Box)`
  display: grid;
`;

const Wrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  padding: 40px 0;
  color: ${prop('theme.gray0')};
  background-color: ${prop('theme.black')};

  ${/* sc-sel */ StyledParagraph} {
    margin: 0;
    line-height: 1.5;
  }

  /* stylelint-disable-next-line */
  ${/* sc-sel */ Link} {
    color: ${prop('theme.gray0')};

    &:hover {
      color: ${prop('theme.accent')};
    }
  }
`;

const Icons = styled(Grid.withComponent(List))`
  font-size: 20px;
  grid-auto-flow: column;
  grid-gap: 16px;
  margin-bottom: 16px;
  color: ${prop('theme.gray0')};

  /* stylelint-disable-next-line */
  ${/* sc-sel */ Link} {
    font-size: 20px;
  }

  ${/* sc-sel */ Link}:hover {
    color: ${prop('theme.accent')};
  }
`;

export const Footer = (props: ComponentProps<typeof Wrapper>) => (
  <Wrapper {...props}>
    <ContentWrapper flexDirection="column">
      <Icons>
        <li>
          <Link ping href="https://github.com/neo-one-suite/neo-one-playground" target="_blank">
            <GoMarkGithub />
          </Link>
        </li>
      </Icons>
      <StyledParagraph>
        Released under the{' '}
        <Link ping href="https://opensource.org/licenses/MIT" target="_blank">
          MIT License
        </Link>
      </StyledParagraph>
      <StyledParagraph>
        Copyright © 2017-
        {year} NEO•ONE
      </StyledParagraph>
    </ContentWrapper>
  </Wrapper>
);
