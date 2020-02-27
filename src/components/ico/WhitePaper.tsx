import styled from '@emotion/styled';
import { Box, Button } from '@neo-one/react-core';
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
  <SectionGrid bg="light" title="White Paper" flex-direction="row-reverse" {...props}>
    <Flex>
      <Subheading data-test="whitepaper-text">
        Our full arsenal of technologies will change the world. Support us and we'll do awesome things. Check out the
        whitepaper for more information.
      </Subheading>
      <Button data-test="whitepaper-button">Whitepaper</Button>
    </Flex>
  </SectionGrid>
);
