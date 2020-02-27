/* @hash 17ff51b3afa58c3f8698d136b5091d31 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { WrappedNEOSmartContract } from './types';
import { wrappedNeoABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AUvGowcFJv1tLfcZfreEhi7uMqXWkLrXFJ',
    },
  },
  abi: wrappedNeoABI,
  sourceMaps,
};

export const createWrappedNEOSmartContract = <TClient extends Client>(
  client: TClient,
): WrappedNEOSmartContract<TClient> => client.smartContract(definition);
