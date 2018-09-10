import { Hash256 } from '@neo-one/client';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider, ThemeProvider } from 'reakit';
import { ContractsProvider, DeveloperTools } from '../one/generated';
import { ScrollToTop } from './components';
import { CoreLayout } from './layout';
import { GASVac, Home, ICO } from './pages';
import { theme } from './theme';

export const App = hot(module)(() => (
  <ThemeProvider theme={theme}>
    <ContractsProvider>
      <Provider initialState={{ transfer: { text: '', asset: Hash256.NEO, loading: false } }}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <CoreLayout>
                <Route exact path="/" component={Home} />
                <Route exact path="/ico" component={ICO} />
                <Route exact path="/gasvac" component={GASVac} />
              </CoreLayout>
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
        <DeveloperTools />
      </Provider>
    </ContractsProvider>
  </ThemeProvider>
));
