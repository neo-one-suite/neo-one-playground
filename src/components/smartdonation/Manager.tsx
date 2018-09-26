import * as React from 'react';
import { Box, styled } from 'reakit';
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
  <StyledSection title="Manage" {...props}>
    <SectionContentWrapper bg="darkLight">
      <Wrapper>
        <SmartDonationManager />
      </Wrapper>
    </SectionContentWrapper>
  </StyledSection>
);
