import { Button } from '@neo-one/react-core';
import * as React from 'react';
import { Flex, Grid, styled } from 'reakit';
import { WithContracts } from '../../../one/generated';
import vacuum from '../../../root/audio/vacuum.mp3';
import { ContentWrapper } from '../../elements';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

const StyledFlex = styled(Flex)`
  justify-content: flex-end;
`;

export function Burn(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, gasVac }) => (
        <StyledFlex>
          <StyledGrid columns="200px 1fr" autoRows="auto" gap="0" {...props}>
            <Grid.Item>
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
            </Grid.Item>
          </StyledGrid>
        </StyledFlex>
      )}
    </WithContracts>
  );
}
