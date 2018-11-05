/* @hash 9e4a307b8f0984b7103fe69fffd32582 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { gasVacABI } from './abi';
import { GASVacSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AHPwLJhwkpNoYMf7KagJqjyyAXCxsoDfUz',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = <TClient extends Client>(client: TClient): GASVacSmartContract<TClient> =>
  client.smartContract<GASVacSmartContract<TClient>>(definition);
