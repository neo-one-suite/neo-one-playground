import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { Flex, Grid, List, Paragraph, styled } from 'reakit';
import { prop } from 'styled-tools';
import { ContentWrapper, Link } from '../elements';
import { ComponentProps } from '../types';

const year = new Date().getFullYear();

const Wrapper = styled(Flex)`
  justify-content: center;
  width: 100%;
  padding: 40px 0;
  color: ${prop('theme.gray0')};
  background-color: ${prop('theme.black')};

  ${/* sc-sel */ Paragraph} {
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

const Icons = styled(Grid)`
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
    <ContentWrapper column>
      <Icons as={List}>
        <li>
          <Link href="https://github.com/neo-one-suite/neo-one-ico" target="_blank">
            <GoMarkGithub />
          </Link>
        </li>
      </Icons>
      <Paragraph>
        Released under the{' '}
        <Link href="https://opensource.org/licenses/MIT" target="_blank">
          MIT License
        </Link>
      </Paragraph>
      <Paragraph>
        Copyright © 2017-
        {year} NEO•ONE
      </Paragraph>
    </ContentWrapper>
  </Wrapper>
);
