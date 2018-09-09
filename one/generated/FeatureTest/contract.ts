/* @hash 991c0ec15a9c546070a8b6b9926fff37 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestReadSmartContract, FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AZ1nfw8nYbhm3kmbZomfaJdu2L4bAg5x47',
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
