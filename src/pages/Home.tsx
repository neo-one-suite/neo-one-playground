import * as React from 'react';
import {
  Authoring,
  Contribute,
  Debugging,
  DeveloperTools,
  Hero,
  NEOTracker,
  Testing,
  TypeScript,
} from '../components/home';

export class Home extends React.Component {
  public shouldComponentUpdate(): boolean {
    return false;
  }

  public render() {
    return (
      <>
        <Hero />
        <Authoring />
        <TypeScript />
        <Testing />
        <Debugging />
        <DeveloperTools />
        <NEOTracker />
        <Contribute />
      </>
    );
  }
}
