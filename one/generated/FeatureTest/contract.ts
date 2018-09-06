/* @hash 71764475e163596c0ebf432b2e6188e1 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestReadSmartContract, FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AVoiRg163xSZpEZU1gJLxPQMZNYv74JQgu',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = (client: Client): FeatureTestSmartContract =>
  client.smartContract<FeatureTestSmartContract>(definition);

export const createFeatureTestReadSmartContract = (client: ReadClient): FeatureTestReadSmartContract =>
  client.smartContract<FeatureTestReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
