// tslint:disable no-null-keyword no-any
import { Hash256 } from '@neo-one/client';
import { Button } from '@neo-one/react';
import * as React from 'react';
import { Flex, Input, styled } from 'reakit';
import { TOKEN, TransferContainer } from '../containers';
import { ComponentProps } from '../types';

const StyledFlex = styled(Flex)`
  max-width: 519px;
  padding: 8px 0;
`;

const StyledInput = styled(Input)`
  margin-right: 8px;
`;

const AssetInput = styled(StyledInput)`
  width: 96px;
`;

export const TransferAmount = (props: ComponentProps<Flex>) => (
  <TransferContainer>
    {({ text, asset, amount, to, loading, onChangeAmount, onChangeAsset, send }) => (
      <StyledFlex {...props}>
        <StyledInput
          value={text}
          placeholder="Amount"
          onChange={(event: React.SyntheticEvent<any>) => onChangeAmount(event.currentTarget.value)}
        />
        <AssetInput
          as="select"
          value={asset}
          onChange={(event: React.SyntheticEvent<any>) => onChangeAsset(event.currentTarget.value)}
        >
          <option value={Hash256.NEO}>NEO</option>
          <option value={Hash256.GAS}>GAS</option>
          <option value={TOKEN}>ONE</option>
        </AssetInput>
        <Button disabled={to === undefined || amount === undefined || loading} onClick={send}>
          Send
        </Button>
      </StyledFlex>
    )}
  </TransferContainer>
);
