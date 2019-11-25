/* @hash 0a2a6e74f3bfa31a90c24cbd73092a8f */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { OneSmartContract } from './types';
import { oneABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'ANaocC5vSKQdTjkapVf2EqiGB3ikJtEfHK',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = <TClient extends Client>(client: TClient): OneSmartContract<TClient> =>
  client.smartContract(definition);
