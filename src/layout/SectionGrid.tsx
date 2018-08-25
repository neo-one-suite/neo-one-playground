import * as React from 'react';
import { Grid, styled } from 'reakit';
import { prop, switchProp } from 'styled-tools';
import { Headline, SectionContentWrapper, Subheading } from '../elements';
import { ComponentProps } from '../types';

interface Props {
  readonly bg: 'dark' | 'light' | 'darkLight';
  readonly title: string;
  readonly children: React.ReactNode;
}

const StyledHeading = styled(Headline)`
  ${prop('theme.fonts.axiformaMedium')};
  /* stylelint-disable-next-line */
  color: ${switchProp('bg', {
    dark: prop('theme.primary'),
    light: prop('theme.primaryDark'),
    darkLight: prop('theme.primaryDark'),
  })};
  margin: 0;
`;

const GridItem = Grid.Item.as(Subheading).as('div');
const StyledItem = styled(GridItem)`
  color: ${switchProp('bg', { dark: prop('theme.gray1'), light: prop('theme.black'), darkLight: prop('theme.black') })};
  margin: 0;
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
