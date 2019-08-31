import { Hash256 } from '@neo-one/client';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider, ThemeProvider } from 'reakit';
import { ScrollToTop } from './components';
import { CoreLayout } from './layout';
import { ContractsProvider } from './neo-one';
import { Escrow, GASVac, Home, ICO, SmartDonation } from './pages';
import { theme } from './theme';

export const App = hot(module)(() => (
  <ThemeProvider theme={theme}>
    <ContractsProvider>
      <Provider initialState={{ transfer: { text: '', asset: Hash256.NEO, loading: false } }}>
        {/*
        // @ts-ignore */}
        <BrowserRouter>
          {/*
          // @ts-ignore */}
          <ScrollToTop>
            {/*
            // @ts-ignore */}
            <Switch>
              <CoreLayout>
                {/*
                // @ts-ignore */}
                <Route exact path="/" component={Home} />
                {/*
                // @ts-ignore */}
                <Route exact path="/ico" component={ICO} />
                {/*
                // @ts-ignore */}
                <Route exact path="/gasvac" component={GASVac} />
                {/*
                // @ts-ignore */}
                <Route exact path="/escrow" component={Escrow} />
                {/*
                // @ts-ignore */}
                <Route exact path="/smart-donation" component={SmartDonation} />
              </CoreLayout>
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </ContractsProvider>
  </ThemeProvider>
));
