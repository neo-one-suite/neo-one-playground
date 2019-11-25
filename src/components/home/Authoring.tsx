import * as React from 'react';
import diagnostics from '../../../root/video/diagnostics.mp4';
import { Body1, Code, Subheading, TryItOut } from '../../elements';
import { AssetSectionGrid } from '../../layout';
import { Video } from './Video';

export function Authoring() {
  return (
    <AssetSectionGrid title="Authoring" bg="light" asset={<Video src={diagnostics} />}>
      <Subheading>
        Authoring smart contracts has never been easier. Write idiomatic TypeScript with inline compiler diagnostics
        using the NEO•ONE TypeScript plugin.
      </Subheading>
      <Subheading>
        <TryItOut /> Modify one of the smart contracts under <Code>neo-one/contracts</Code> and then run{' '}
        <Code>yarn neo-one build</Code> to view the changes.
      </Subheading>
      <Body1>
        Verify the TypeScript plugin is enabled to see compiler diagnostics. In VSCode, click the TypeScript version
        number on the lower right hand side of the screen and set it to the workspace version of TypeScript.
      </Body1>
    </AssetSectionGrid>
  );
}
