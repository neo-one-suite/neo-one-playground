import * as React from 'react';
import { Grid } from 'reakit';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';

export function DeveloperTools() {
  return (
    <SectionGrid bg="light" title="Developer Tools">
      <Grid gap={16}>
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
