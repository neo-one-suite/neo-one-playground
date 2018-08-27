import * as React from 'react';
import { Grid } from 'reakit';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';

export function NEOTracker() {
  return (
    <SectionGrid bg="darkLight" title="NEO Tracker">
      <Grid gap={16}>
        <Subheading>
          NEO Tracker comes built in to NEO•ONE enabling quick and easy blockchain exploration. When combined with the
          Developer Tools component, all confirmed transactions automatically pop up with a link to NEO Tracker to view
          more information.
        </Subheading>
        <Subheading>
          <TryItOut /> Open the NEO•ONE Developer Tools and click the right-most button to open NEO Tracker.
        </Subheading>
      </Grid>
    </SectionGrid>
  );
}
