/* @hash d23240929b782db255aae1af31f7285c */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { oneABI } from './abi';
import { OneReadSmartContract, OneSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AaUzsqma2iQ3M1SCNwRFsj4dgRcUVzanSw',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = (client: Client): OneSmartContract =>
  client.smartContract<OneSmartContract>(definition);

export const createOneReadSmartContract = (client: ReadClient): OneReadSmartContract =>
  client.smartContract<OneReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
