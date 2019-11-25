import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { Subheading } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';

const Flex = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WhitePaper = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="light" title="White Paper" flexDirection="row-reverse" {...props}>
    <Flex>
      <Subheading data-test="whitepaper-text">
        When we set out to create the worlds best GAS vacuum we had no idea what we would discover. Using state of the
        art SmartContract technology we have been able to develop a product that will revolutionize the worlds ability
        to throw its cryptocurrency down the drain!
      </Subheading>
    </Flex>
  </SectionGrid>
);
