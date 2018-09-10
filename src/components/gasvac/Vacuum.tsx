import * as React from 'react';
import { ContentWrapper } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { Burn } from './Burn';
import { Description } from './Description';

export const Vacuum = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="darkLight" title="Burn Gas!" {...props}>
    <ContentWrapper justifyContent="center">
      <Description />
      <Burn />
    </ContentWrapper>
  </SectionGrid>
);
