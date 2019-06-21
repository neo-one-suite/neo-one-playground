import * as React from 'react';
import { Box, List, styled } from 'reakit';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { Description } from './Description';

const Wrapper = styled(Box)`
  display: inline-block;
`;

// tslint:disable-next-line no-any
const ListHeader = styled(Box.as('li') as any)`
  font-weight: bold;
  font-size: 18pt;
  margin-top: 25px;
`;

// tslint:disable-next-line no-any
const ListItem = styled(Box.as('li') as any)`
  list-style-type: disc;
  margin-left: 25px;
  font-size: 10pt;
`;

export const Info = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="gray5" title="Description" {...props}>
    <Wrapper>
      <Description />
      <List>
        <ListHeader>Things to Try!</ListHeader>
        <ListItem>
          Zero balance in the "From Account"? Make sure to load up your wallet with ONE tokens over at the ICO page!
        </ListItem>
        <ListItem>
          Try sending some ONE tokens to the selected "To Account". They should appear in the Escrow account, ready to
          be claimed.
        </ListItem>
        <ListItem>
          Once you have tokens in escrow, try claiming them with the "To Account" or revoking them with the "From
          Account".
        </ListItem>
        <ListItem>
          Switch accounts and play around! Make sure to check out the source code to see the simple smart contract that
          makes this possible.
        </ListItem>
      </List>
    </Wrapper>
  </SectionGrid>
);
