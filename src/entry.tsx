import * as React from 'react';
import * as ReactDOM from 'react-dom';

const render = () => {
  // tslint:disable-next-line no-require-imports
  const App = require('./App').App;
  ReactDOM.render(<App />, document.getElementById('app'));
};

// tslint:disable-next-line no-any
const currentModule = module as any;
if (currentModule.hot) {
  currentModule.hot.accept('./src/App.tsx', () => {
    render();
  });
}

render();
