import styled from '@emotion/styled';
import { Box, Button } from '@neo-one/react-core';
import * as React from 'react';
import vacuum from '../../../root/audio/vacuum.mp3';
import { ContentWrapper } from '../../elements';
import { WithContracts } from '../../neo-one';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Box)`
  display: grid;
  padding: 8px 0;
  grid-gap: 0;
  grid-auto-rows: auto;
  grid-template-columns: 200px 1fr;
`;

const GridItem = styled(Box)``;

const StyledFlex = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

export function Burn(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, gasVac }) => (
        <StyledFlex>
          <StyledGrid {...props}>
            <GridItem>
              {
                <ContentWrapper justifyContent="center">
                  <Button
                    onClick={async () => {
                      const audio = new Audio(vacuum);
                      const from = client.getCurrentUserAccount();
                      if (from === undefined) {
                        return;
                      }
                      await audio.play();
                      await gasVac.vacuum.confirmed(from.id.address);
                    }}
                  >
                    Burn Gas
                  </Button>
                </ContentWrapper>
              }
            </GridItem>
          </StyledGrid>
        </StyledFlex>
      )}
    </WithContracts>
  );
}
