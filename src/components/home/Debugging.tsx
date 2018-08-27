import { Button } from '@neo-one/react';
import * as React from 'react';
import { Grid } from 'reakit';
import { WithContracts } from '../../../one/generated';
import { Subheading, TryItOut } from '../../elements';
import { SectionGrid } from '../../layout';

export function Debugging() {
  return (
    <SectionGrid bg="dark" title="Debugging">
      <Grid gap={16}>
        <Subheading>
          Debugging NEO•ONE contracts is a breeze with full support for console logging and error stack traces in tests
          and in the browser. Run into an issue with the compiler? The error will show the exact line that caused it.
        </Subheading>
        <Subheading>
          <TryItOut /> Open up your browser console and click the buttons below.
        </Subheading>
        <WithContracts>
          {({ featureTest }) => (
            <Grid gap={16} gridAutoFlow="column" justifyItems="start" justifyContent="start">
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
            </Grid>
          )}
        </WithContracts>
      </Grid>
    </SectionGrid>
  );
}
