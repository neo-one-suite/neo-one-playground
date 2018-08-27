import * as React from 'react';
import { Body1, Code, TryItOut } from '../../elements';
import { AssetSectionGrid } from '../../layout';

export function Authoring() {
  return (
    <AssetSectionGrid title="Authoring" bg="light" asset="video">
      <div>
        Authoring smart contracts has never been easier. Write idiomatic TypeScript with inline compiler diagnostics
        using the NEO•ONE TypeScript plugin.
      </div>
      <div>
        <TryItOut /> Modify one of the smart contracts under <Code>one/contracts</Code> and then run{' '}
        <Code>yarn neo-one build</Code> to view the changes.
      </div>
      <Body1>
        Verify the TypeScript plugin is enabled to see compiler diagnostics. In VSCode, click the TypeScript version
        number on the lower right hand side of the screen and set it to use the workspace version of TypeScript.
      </Body1>
    </AssetSectionGrid>
  );
}
