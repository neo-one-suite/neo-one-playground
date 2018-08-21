import { Client } from '@neo-one/client';
import * as React from 'react';
import { ICOSmartContract } from '../../one/generated';
import { SectionGrid } from '../layout';
import { ComponentProps } from '../types';
import { WalletInfo } from './WalletInfo';
import { WalletSelector } from './WalletSelector';

interface Props {
  readonly client: Client;
  readonly ico: ICOSmartContract;
}

export const Wallet = ({ client, ico, ...props }: Props & Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="dark" title="Wallet" {...props}>
    <WalletSelector client={client} />
    <WalletInfo client={client} ico={ico} />
  </SectionGrid>
);
