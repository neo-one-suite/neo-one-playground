/* @hash 33b758a2978ce80446cbee58ba089221 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestReadSmartContract, FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AFoqKB1GxfPvuZbPjoTGcT4R8jZbqbc6PT',
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
