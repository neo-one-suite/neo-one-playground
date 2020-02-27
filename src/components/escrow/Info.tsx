import styled from '@emotion/styled';
import { Box, List } from '@neo-one/react-core';
import * as React from 'react';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { Description } from './Description';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const ListHeader = styled(Box.withComponent('li'))`
  font-weight: bold;
  font-size: 18pt;
  margin-top: 25px;
`;

const ListItem = styled(Box.withComponent('li'))`
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
