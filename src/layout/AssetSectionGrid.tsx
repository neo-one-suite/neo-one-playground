import * as React from 'react';
import { Grid, styled } from 'reakit';
import { prop } from 'styled-tools';
import { Headline, SectionContentWrapper, Subheading } from '../elements';

interface Props {
  readonly bg: 'light' | 'darkLight';
  readonly title: string;
  readonly asset: React.ReactNode;
  readonly children: React.ReactNode;
  readonly reverse?: boolean;
}

const StyledHeading = styled(Headline)`
  ${prop('theme.fonts.axiformaMedium')};
  /* stylelint-disable-next-line */
  color: ${prop('theme.black')};
  margin: 0;
`;

const GridSubheading = Grid.as(Subheading);
const Content = styled(GridSubheading)`
  color: ${prop('theme.black')};
  display: grid;
  margin: 0;
`;

const template = `
  "asset content" auto
  / 3fr 4fr
`;

const reverseTemplate = `
  "content asset" auto
  / 4fr 3fr
`;

export const AssetSectionGrid = ({ title, children, bg, asset, reverse, ...props }: Props) => (
  <SectionContentWrapper bg={bg} {...props}>
    <Grid template={reverse ? reverseTemplate : template} gap={16} alignItems="center" justifyItems="center">
      <Grid.Item area="asset">{asset}</Grid.Item>
      <Grid.Item area="content">
        <Grid gap={16}>
          <StyledHeading>{title}</StyledHeading>
          <Content gap={16}>{children}</Content>
        </Grid>
      </Grid.Item>
    </Grid>
  </SectionContentWrapper>
);
