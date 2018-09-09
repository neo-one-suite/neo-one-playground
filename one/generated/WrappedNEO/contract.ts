/* @hash fba414494f27ff58301df5bc7db43f67 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOReadSmartContract, WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AGsnfE8XDvYBs4rneWFf57TD7tq2tAb9n2',
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
