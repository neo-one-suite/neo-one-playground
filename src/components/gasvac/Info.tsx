import * as React from 'react';
import { Button, Flex, Grid, styled } from 'reakit';
import { WithContracts } from '../../../one/generated';
import vacuum from '../../../root/audio/vacuum.mp3';
import { ContentWrapper } from '../../elements';
import { ComponentProps } from '../../types';

const StyledGrid = styled(Grid)`
  padding: 8px 0;
`;

export function Info(props: ComponentProps<typeof StyledGrid>) {
  return (
    <WithContracts>
      {({ client, gasVac }) => (
        <Flex justifyContext="flex-end">
          <StyledGrid columns="200px 1fr" autoRows="auto" gap="0" {...props}>
            <Grid.Item data-test="info-button">
              {
                <ContentWrapper justifyContent="center">
                  <Button
                    position="center"
                    data-test="contribute-button"
                    backgroundColor="#00d180"
                    onClick={() => {
                      const audio = new Audio(vacuum);
                      const from = client.getCurrentAccount();
                      if (from === undefined) {
                        return;
                      }
                      audio.play();
                      gasVac
                        .vacuum(from.id.address)
                        .then((result) => {
                          result.confirmed();
                        })
                        .catch((err) => console.error(err));
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
