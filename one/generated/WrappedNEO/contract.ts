/* @hash 27059faac22831f869ed4ace7392c843 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AT7tZaKStCLsL9C53X4ew3H5ZyqyWpCqzC',
    },
  },
  abi: wrappedNeoABI,
  sourceMaps,
};

export const createWrappedNEOSmartContract = <TClient extends Client>(
  client: TClient,
): WrappedNEOSmartContract<TClient> => client.smartContract<WrappedNEOSmartContract<TClient>>(definition);
