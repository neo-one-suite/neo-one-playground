/* @hash a3991c5df13a909508a123b5ba9304f5 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { GASVacSmartContract } from './types';
import { gasVacABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AMUFFMfEuQWU1KFyVTCHXVqxZ6tyjGKRst',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = <TClient extends Client>(client: TClient): GASVacSmartContract<TClient> =>
  client.smartContract(definition);
