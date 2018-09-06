/* @hash 4e285ac48b885ca4d8266cf6c4acb019 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOReadSmartContract, WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'Abhrj9F5KQBXL8JD3bJwwiS94wyJ6UKHy2',
    },
  },
  abi: wrappedNeoABI,
  sourceMaps,
};

export const createWrappedNEOSmartContract = (client: Client): WrappedNEOSmartContract =>
  client.smartContract<WrappedNEOSmartContract>(definition);

export const createWrappedNEOReadSmartContract = (client: ReadClient): WrappedNEOReadSmartContract =>
  client.smartContract<WrappedNEOReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
