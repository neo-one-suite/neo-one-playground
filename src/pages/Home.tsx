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

export function Home() {
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
