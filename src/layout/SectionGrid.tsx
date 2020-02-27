import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { prop, switchProp } from 'styled-tools';
import { BackgroundColors, Headline, SectionContentWrapper, Subheading } from '../elements';
import { ComponentProps } from '../types';

interface Props {
  readonly bg: BackgroundColors;
  readonly title: string;
  readonly children: React.ReactNode;
}

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(400px, 2fr);
`;

const StyledHeading = styled(Headline)<{ readonly bg: BackgroundColors }, {}>`
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

const GridItem = Box.withComponent(Subheading.withComponent('div'));
const StyledItem = styled(GridItem)<{ readonly bg: BackgroundColors }, {}>`
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
    <Grid>
      <GridItem>
        <StyledHeading bg={bg}>{title}</StyledHeading>
      </GridItem>
      <StyledItem bg={bg}>{children}</StyledItem>
    </Grid>
  </SectionContentWrapper>
);
