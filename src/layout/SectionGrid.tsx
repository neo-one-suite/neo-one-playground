import * as React from 'react';
import { Grid, styled } from 'reakit';
import { prop, switchProp } from 'styled-tools';
import { Headline, SectionContentWrapper, Subheading } from '../elements';
import { ComponentProps } from '../types';

type Background = 'dark' | 'light' | 'darkLight' | 'gray5';
interface Props {
  readonly bg: Background;
  readonly title: string;
  readonly children: React.ReactNode;
}

const StyledHeading = styled(Headline)<{ readonly bg: Background }>`
  ${prop('theme.fonts.axiformaMedium')};
  /* stylelint-disable-next-line */
  color: ${switchProp('bg', {
    gray5: prop('theme.primary'),
    dark: prop('theme.primary'),
    light: prop('theme.primaryDark'),
    darkLight: prop('theme.primaryDark'),
  })};
  margin: 0;
`;

const GridItem = Grid.Item.as(Subheading).as('div');
const StyledItem = styled(GridItem)`
  /* stylelint-disable-next-line */
  color: ${switchProp('bg', {
    gray5: prop('theme.gray1'),
    dark: prop('theme.gray1'),
    light: prop('theme.black'),
    darkLight: prop('theme.black'),
  })};
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
