import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';

const Grid = styled(Box)`
  display: grid;
  grid-gap: 16px;
`;

export function DeveloperTools() {
  return (
    <SectionGrid bg="light" title="Developer Tools">
      <Grid>
        <Subheading>
          NEO•ONE's Developer Tools component makes developing a decentralized application easier, faster and much more
          satisfying. Developers can switch between preloaded local development wallets, fast forward the current block
          time and more.
        </Subheading>
        <Subheading>
          <TryItOut /> Choose one of the demo pages and click the NEO•ONE button on the lower left side of the window.
        </Subheading>
      </Grid>
    </SectionGrid>
  );
}
