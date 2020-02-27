import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';

const Grid = styled(Box)`
  display: grid;
  grid-gap: 16px;
`;

export function NEOTracker() {
  return (
    <SectionGrid bg="darkLight" title="NEO Tracker">
      <Grid>
        <Subheading>
          NEO Tracker comes built-in with NEO•ONE enabling quick and easy blockchain exploration. When combined with the
          Developer Tools, all confirmed transactions pop up with a link to NEO Tracker to view more information.
        </Subheading>
        <Subheading>
          <TryItOut /> Open the NEO•ONE Developer Tools and click the right-most button to open NEO Tracker.
        </Subheading>
      </Grid>
    </SectionGrid>
  );
}
