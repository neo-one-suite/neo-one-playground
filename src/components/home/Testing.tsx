import * as React from 'react';
import { Code, Subheading, TryItOut } from '../../elements';
import { AssetSectionGrid } from '../../layout';

export function Testing() {
  return (
    <AssetSectionGrid title="Testing" bg="light" asset="video">
      <div>
        Test smart contracts with human-friendly NEO•ONE client APIs. Each test runs a fresh full node and comes with
        handy utilities to enable scenarios like fast forwarding the node's block time to a point in the future.
      </div>
      <Subheading>
        <TryItOut /> Run the playground tests with
      </Subheading>
      <Code block>yarn test FeatureTest.test.ts</Code>
    </AssetSectionGrid>
  );
}
