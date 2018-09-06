/* @hash 0a616ea7c5f026cd6e0ffd48256449e8 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOReadSmartContract, WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AShM5Wt49PPVMuRDAn3SyiggnFi87ZRqZC',
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
