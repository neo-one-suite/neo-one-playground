import { Client } from '@neo-one/client';
import * as React from 'react';
import { DefaultUserAccountProviders, WithContracts } from '../one/generated';
import { ICO, Transfer, Wallet } from './components';
import { CoreLayout } from './layout';

export interface Props {
  readonly client: Client<DefaultUserAccountProviders>;
}

export function Playground() {
  return (
    <CoreLayout>
      <WithContracts>
        {({ client, ico }) => (
          <>
            <Wallet client={client} ico={ico} />
            <Transfer />
            <ICO />
          </>
        )}
      </WithContracts>
    </CoreLayout>
  );
}
