/* @hash 161ddfd6bef3dc683f4dfbc38187e199 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestReadSmartContract, FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AX1z2mZHFU6MfdESmUNkFaq9MhbpaPpxqU',
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
