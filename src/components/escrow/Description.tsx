import * as React from 'react';
import { Subheading } from '../../elements';

export function Description() {
  return (
    <Subheading data-test="escrow-description">
      Make your ONE tokens available to receive with this simple smart contract! Simply send some ONE to the selected
      "To Account". The contract will then hold the tokens until they are claimed by the receiver. The sender can also
      reclaim the tokens.
    </Subheading>
  );
}
