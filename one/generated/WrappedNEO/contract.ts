/* @hash e309bb50b43cfca822c4925f46bcd8f4 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AKnGFnHtG45zHCHG5vPZaYVHWrMVbTW8YK',
    },
  },
  abi: wrappedNeoABI,
  sourceMaps,
};

export const createWrappedNEOSmartContract = <TClient extends Client>(
  client: TClient,
): WrappedNEOSmartContract<TClient> => client.smartContract<WrappedNEOSmartContract<TClient>>(definition);
