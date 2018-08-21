import { Hash256 } from '@neo-one/client';
import * as React from 'react';
import { Provider, ThemeProvider } from 'reakit';
import { ContractsProvider, DeveloperTools } from '../one/generated';
import { Playground } from './Playground';
import { theme } from './theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContractsProvider>
        <Provider initialState={{ transfer: { text: '', asset: Hash256.NEO, loading: false } }}>
          <Playground />
          <DeveloperTools />
        </Provider>
      </ContractsProvider>
    </ThemeProvider>
  );
}
