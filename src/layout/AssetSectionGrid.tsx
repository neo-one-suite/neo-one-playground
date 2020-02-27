import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { ifProp, prop } from 'styled-tools';
import { Headline, SectionContentWrapper, Subheading } from '../elements';

interface Props {
  readonly bg: 'light' | 'darkLight';
  readonly title: string;
  readonly asset: React.ReactNode;
  readonly children: React.ReactNode;
  readonly reverse?: boolean;
}

const Grid = styled(Box)`
  display: grid;
  grid-gap: 16px;
`;

const template = `
  "asset content" auto
  / 3fr 4fr
`;

const reverseTemplate = `
  "content asset" auto
  / 4fr 3fr
`;

const GridWrapper = styled(Grid)<{ readonly reverse?: boolean }>`
  grid-template-rows: auto;
  align-items: center;
  justify-items: center;
  grid-template: ${ifProp('reverse', reverseTemplate, template)};
`;

const GridItem = styled(Box)<{ readonly area: string }, {}>`
  grid-area: ${prop('area')};
`;

const StyledHeading = styled(Headline)`
  ${prop('theme.fonts.axiformaMedium')};
  color: ${prop('theme.black')};
  margin: 0;
`;

const Content = styled(Grid.withComponent(Subheading))`
  color: ${prop('theme.black')};
  display: grid;
  margin: 0;
  grid-gap: 16px;
`;

export const AssetSectionGrid = ({ title, children, bg, asset, reverse, ...props }: Props) => (
  <SectionContentWrapper bg={bg} {...props}>
    <GridWrapper reverse={reverse}>
      <GridItem area="asset">{asset}</GridItem>
      <GridItem area="content">
        <Grid>
          <StyledHeading>{title}</StyledHeading>
          <Content>{children}</Content>
        </Grid>
      </GridItem>
    </GridWrapper>
  </SectionContentWrapper>
);
