import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { prop } from 'styled-tools';
import { SectionContentWrapper } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { SmartDonationManager } from './SmartDonationManager';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const StyledSection = styled(SectionGrid)`
  background-color: ${prop('theme.gray1')};
  color: ${prop('theme.primaryDark')};
`;

export const Manager = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <StyledSection title="Manage" bg="light" {...props}>
    <SectionContentWrapper bg="darkLight">
      <Wrapper>
        <SmartDonationManager />
      </Wrapper>
    </SectionContentWrapper>
  </StyledSection>
);
