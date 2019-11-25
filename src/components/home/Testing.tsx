import * as React from 'react';
import testing from '../../../root/video/testing.mp4';
import { Code, Subheading, TryItOut } from '../../elements';
import { AssetSectionGrid } from '../../layout';
import { Video } from './Video';

export function Testing() {
  return (
    <AssetSectionGrid title="Testing" bg="light" asset={<Video src={testing} />}>
      <Subheading>
        Test smart contracts with human-friendly NEO•ONE client APIs. Each test runs a fresh full node and comes with
        handy utilities to enable scenarios like fast forwarding the node's block time to a point in the future.
      </Subheading>
      <Subheading>
        <TryItOut /> Run the playground tests with
      </Subheading>
      <Code block>yarn test</Code>
    </AssetSectionGrid>
  );
}
