import * as React from 'react';
import { SectionGrid } from '../layout';
import { ComponentProps } from '../types';
import { ICOInfo } from './ICOInfo';
import { ICOParticipate } from './ICOParticipate';

export const ICO = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="darkLight" title="ICO" {...props}>
    <ICOInfo />
    <ICOParticipate />
  </SectionGrid>
);
