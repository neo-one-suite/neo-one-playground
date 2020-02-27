import styled from '@emotion/styled';
import { Box, Button } from '@neo-one/react-core';
import * as React from 'react';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';
import { WithContracts } from '../../neo-one';

const Grid = styled(Box)`
  display: grid;
  grid-gap: 16px;
`;

const SubGrid = styled(Grid)`
  grid-auto-flow: column;
  justify-items: start;
  justify-content: start;
`;

export function Debugging() {
  return (
    <SectionGrid bg="dark" title="Debugging">
      <Grid>
        <Subheading>
          Debugging NEO•ONE contracts is a breeze with full support for console logging and error stack traces in tests
          and in the browser. Run into an issue with the compiler? The error will show the exact line that caused it.
        </Subheading>
        <Subheading>
          <TryItOut /> Open your browser console and press the buttons below.
        </Subheading>
        <WithContracts>
          {({ featureTest }) => (
            <SubGrid>
              <Button
                data-test="debugging-error-trace-button"
                onClick={() => {
                  featureTest
                    .stackTrace()
                    .then(async (result) => result.confirmed())
                    .catch(() => {
                      // do nothing
                    });
                }}
              >
                Error Trace
              </Button>
              <Button
                data-test="debugging-console-log-button"
                onClick={() => {
                  featureTest
                    .consoleLog()
                    .then(async (result) => result.confirmed())
                    .catch(() => {
                      // do nothing
                    });
                }}
              >
                console.log
              </Button>
              <Button
                data-test="debugging-type-error-button"
                onClick={() => {
                  featureTest
                    .typeError()
                    .then(async (result) => result.confirmed())
                    .catch(() => {
                      // do nothing
                    });
                }}
              >
                Type Error
              </Button>
            </SubGrid>
          )}
        </WithContracts>
      </Grid>
    </SectionGrid>
  );
}
