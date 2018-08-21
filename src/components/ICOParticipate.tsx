// tslint:disable no-null-keyword no-any
import { Button } from '@neo-one/react';
import * as React from 'react';
import { Flex, Input, styled } from 'reakit';
import { ICOContainer } from '../containers';
import { ComponentProps } from '../types';

const StyledFlex = styled(Flex)`
  max-width: 519px;
  padding: 8px 0;
`;

const StyledInput = styled(Input)`
  margin-right: 8px;
`;

export const ICOParticipate = (props: ComponentProps<Flex>) => (
  <ICOContainer>
    {({ text, amount, loading, onChangeAmount, send }) => (
      <StyledFlex {...props}>
        <StyledInput
          value={text}
          placeholder="NEO Amount"
          onChange={(event: React.SyntheticEvent<any>) => onChangeAmount(event.currentTarget.value)}
        />
        <Button disabled={amount === undefined || loading} onClick={send}>
          Send
        </Button>
      </StyledFlex>
    )}
  </ICOContainer>
);
