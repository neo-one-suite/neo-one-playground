import * as React from 'react';
import { SectionGrid } from '../layout';
import { ComponentProps } from '../types';
import { TransferAmount } from './TransferAmount';
import { TransferTo } from './TransferTo';

export const Transfer = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="light" title="Transfer" {...props}>
    <TransferTo />
    <TransferAmount />
  </SectionGrid>
);
