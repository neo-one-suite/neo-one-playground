/* @hash 922019f1ced950da2d7ab271fa0f4f5a */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ATAP39YDztANYijzNjX1xcV2NJ4bXx4uwz',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = <TClient extends Client>(
  client: TClient,
): FeatureTestSmartContract<TClient> => client.smartContract<FeatureTestSmartContract<TClient>>(definition);
