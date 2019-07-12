/* @hash 55494ce6720c8c1f12e6340165d020a5 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { gasVacABI } from './abi';
import { GASVacSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'Aer9KwLDRcaUYHgthpRBefFxCggsFAyCXw',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = <TClient extends Client>(client: TClient): GASVacSmartContract<TClient> =>
  client.smartContract<GASVacSmartContract<TClient>>(definition);
