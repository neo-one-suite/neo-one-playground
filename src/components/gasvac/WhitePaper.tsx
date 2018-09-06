import * as React from 'react';
import { Flex } from 'reakit';
import { Subheading } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';

export const WhitePaper = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="light" title="White Paper" reverse {...props}>
    <Flex column alignItems="center">
      <Subheading data-test="whitepaper-text">
        When we set out to create the worlds best GAS vacuum we had no idea what we would discover.
        Using state of the art SmartContract technology we have been able to develop a product that will
        revolutionize the worlds ability to throw its cryptocurrency down the drain!
      </Subheading>
    </Flex>
  </SectionGrid>
);
