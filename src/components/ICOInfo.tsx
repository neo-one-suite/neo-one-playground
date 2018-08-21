import { FromStream } from '@neo-one/react';
import * as React from 'react';
import { Grid, styled } from 'reakit';
import { switchMap } from 'rxjs/operators';
import { WithContracts } from '../../one/generated';
import { ComponentProps } from '../types';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

export function ICOInfo(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, ico }) => (
        <FromStream
          props$={client.block$.pipe(
            switchMap(async () => {
              const [totalSupply, remaining] = await Promise.all([ico.totalSupply(), ico.remaining()]);

              return { totalSupply, remaining };
            }),
          )}
        >
          {(options) => (
            <StyledGrid columns="120px 1fr" autoRows="auto" gap="0" {...props}>
              <Grid.Item>Supply:</Grid.Item>
              <Grid.Item>{options.totalSupply.toFormat()}</Grid.Item>
              <Grid.Item>Remaining:</Grid.Item>
              <Grid.Item>{options.remaining.toFormat()}</Grid.Item>
            </StyledGrid>
          )}
        </FromStream>
      )}
    </WithContracts>
  );
}
