/* @hash dbbaaa00e2f6f85a59d6f196cf70acaf */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { WrappedNEOSmartContract } from './types';
import { wrappedNeoABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
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
): WrappedNEOSmartContract<TClient> => client.smartContract(definition);
