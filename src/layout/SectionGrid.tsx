import * as React from 'react';
import { Grid, Heading, styled } from 'reakit';
import { prop, switchProp } from 'styled-tools';
import { SectionContentWrapper } from '../elements';
import { ComponentProps } from '../types';

interface Props {
  readonly bg: 'dark' | 'light' | 'darkLight';
  readonly title: string;
  readonly children: React.ReactNode;
}

const StyledHeading = styled(Heading)`
  ${prop('theme.fonts.axiformaMedium')};
  /* stylelint-disable-next-line */
  color: ${switchProp('bg', {
    dark: prop('theme.primary'),
    light: prop('theme.primaryDark'),
    darkLight: prop('theme.primaryDark'),
  })};
  font-size: 1.5rem;
  line-height: 1.35416em;
  margin: 0;
`;

const StyledItem = styled(Grid.Item)`
  ${prop('theme.fonts.axiformaRegular')};
  color: ${switchProp('bg', { dark: prop('theme.gray1'), light: prop('theme.black'), darkLight: prop('theme.black') })};
  font-size: 1rem;
  line-height: 1.5em;
`;

export const SectionGrid = ({
  title,
  children,
  bg,
  ...props
}: Props & ComponentProps<typeof SectionContentWrapper>) => (
  <SectionContentWrapper bg={bg} {...props}>
    <Grid columns="minmax(200px, 1fr) minmax(400px, 2fr)">
      <Grid.Item>
        <StyledHeading bg={bg}>{title}</StyledHeading>
      </Grid.Item>
      <StyledItem bg={bg}>{children}</StyledItem>
    </Grid>
  </SectionContentWrapper>
);
