import * as React from 'react';
import { Base, styled } from 'reakit';
import { WalletContainer } from '../../containers';
import { SectionContentWrapper } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { EscrowApp } from './EscrowApp';

const Wrapper = styled(Base)`
  display: inline-block;
`;

export const Participate = (props: Partial<ComponentProps<typeof SectionGrid>>) => (
  <SectionContentWrapper bg="darkLight" {...props}>
    <WalletContainer>
      {({ toWallet, setToWallet }) => (
        <Wrapper>
          <EscrowApp toWallet={toWallet} setToWallet={setToWallet} />
        </Wrapper>
      )}
    </WalletContainer>
  </SectionContentWrapper>
);
