import * as React from 'react';
import { Box, styled } from 'reakit';
import { prop } from 'styled-tools';
import { WalletContainer } from '../../containers';
import { SectionContentWrapper } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { SmartDonationViewer } from './SmartDonationViewer';

const Wrapper = styled(Box)`
  display: inline-block;
`;

const StyledSection = styled(SectionGrid)`
  background-color: ${prop('theme.gray1')};
  color: ${prop('theme.primaryDark')};
`;

export const Viewer = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <StyledSection bg="light" title="Contribute" {...props}>
    <SectionContentWrapper bg="darkLight">
      <WalletContainer>
        {({ toWallet, setToWallet }) => (
          <Wrapper>
            <SmartDonationViewer source={toWallet} setToWallet={setToWallet} />
          </Wrapper>
        )}
      </WalletContainer>
    </SectionContentWrapper>
  </StyledSection>
);
