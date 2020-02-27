import styled from '@emotion/styled';
import { Box } from '@neo-one/react-core';
import * as React from 'react';
import { WalletContainer } from '../../containers';
import { SectionContentWrapper } from '../../elements';
import { SectionGrid } from '../../layout';
import { ComponentProps } from '../../types';
import { EscrowApp } from './EscrowApp';

const Wrapper = styled(Box)`
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
