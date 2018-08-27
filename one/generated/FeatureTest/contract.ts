/* @hash a311add4ce35bdc726f703fd34b0c46e */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestReadSmartContract, FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AYZs8JcWeC2W47KnVvqQQuz1PngbH2khFQ',
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
