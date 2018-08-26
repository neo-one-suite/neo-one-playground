import { Button } from '@neo-one/react';
import * as React from 'react';
import { Flex } from 'reakit';
import { Subheading } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';

export const WhitePaper = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionGrid bg="light" title="White Paper" reverse {...props}>
    <Flex column alignItems="center">
      <Subheading data-test="whitepaper-text">
        Our full arsenal of technologies will change the world. Support us and we'll do awesome things. Check out the
        whitepaper for more information.
      </Subheading>
      <Button data-test="whitepaper-button">Whitepaper</Button>
    </Flex>
  </SectionGrid>
);
