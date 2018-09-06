/* @hash a9a08a43d22973ed2292ce1ee3a70fd1 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { gasVacABI } from './abi';
import { GASVacReadSmartContract, GASVacSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AKWZATBE6zH7eC1uocNkaaPQMPqPWEGuG8',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = (client: Client): GASVacSmartContract =>
  client.smartContract<GASVacSmartContract>(definition);

export const createGASVacReadSmartContract = (client: ReadClient): GASVacReadSmartContract =>
  client.smartContract<GASVacReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
