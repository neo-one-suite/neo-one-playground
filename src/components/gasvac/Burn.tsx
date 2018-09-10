import { Button } from '@neo-one/react';
import * as React from 'react';
import { Flex, Grid, styled } from 'reakit';
import { WithContracts } from '../../../one/generated';
import vacuum from '../../../root/audio/vacuum.mp3';
import { ContentWrapper } from '../../elements';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

export function Burn(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, gasVac }) => (
        <Flex justifyContext="flex-end">
          <StyledGrid columns="200px 1fr" autoRows="auto" gap="0" {...props}>
            <Grid.Item>
              {
                <ContentWrapper justifyContent="center">
                  <Button
                    onClick={() => {
                      const audio = new Audio(vacuum);
                      const from = client.getCurrentAccount();
                      if (from === undefined) {
                        return;
                      }
                      audio.play();
                      gasVac.vacuum.confirmed(from.id.address);
                    }}
                  >
                    Burn Gas
                  </Button>
                </ContentWrapper>
              }
            </Grid.Item>
          </StyledGrid>
        </Flex>
      )}
    </WithContracts>
  );
}
