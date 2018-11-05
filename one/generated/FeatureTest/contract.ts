/* @hash 703806067f362f7c5cbbb1637409e8ab */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AYXd19nKgnHUKUFXKKPPbHS3JqSN7TrFu6',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = <TClient extends Client>(
  client: TClient,
): FeatureTestSmartContract<TClient> => client.smartContract<FeatureTestSmartContract<TClient>>(definition);
