import { Hash256 } from '@neo-one/client';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider, ThemeProvider } from 'reakit';
import { ContractsProvider, DeveloperTools } from '../one/generated';
import { ScrollToTop } from './components';
import { CoreLayout } from './layout';
import { Home, ICO } from './pages';
import { theme } from './theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContractsProvider>
        <Provider initialState={{ transfer: { text: '', asset: Hash256.NEO, loading: false } }}>
          <BrowserRouter>
            <ScrollToTop>
              <Switch>
                <CoreLayout>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/ico" component={ICO} />
                </CoreLayout>
              </Switch>
            </ScrollToTop>
          </BrowserRouter>
          <DeveloperTools />
        </Provider>
      </ContractsProvider>
    </ThemeProvider>
  );
}