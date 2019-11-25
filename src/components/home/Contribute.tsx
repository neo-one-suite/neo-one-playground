import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { prop } from 'styled-tools';
import { Link } from '../../elements';
import { SectionGrid } from '../../layout';

const Grid = styled(Box)`
  display: grid;
  grid-gap: 16px;
`;

const StyledLink = styled(Link)`
  color: ${prop('theme.primary')};
`;

export function Contribute() {
  return (
    <SectionGrid bg="gray5" title="Contribute">
      <Grid>
        <div>
          We're always looking for more contributors. One great way to help is to expand the Playground with more
          features and more demo applications. Take a look at the open issues on{' '}
          <StyledLink ping href="https://github.com/neo-one-suite/neo-one-playground/issues" target="_blank">
            GitHub
          </StyledLink>{' '}
          for more ideas.
        </div>
        <div>
          Want to contribute to NEO•ONE? Head on over to the{' '}
          <StyledLink ping href="https://neo-one.io/docs/en/contributing.html" target="_blank">
            Contributing
          </StyledLink>{' '}
          guide to learn how you can help.
        </div>
      </Grid>
    </SectionGrid>
  );
}
