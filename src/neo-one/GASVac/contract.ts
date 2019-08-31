/* @hash fbac2450f282ec1c68ab256e66924008 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { GASVacSmartContract } from './types';
import { gasVacABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'Aer9KwLDRcaUYHgthpRBefFxCggsFAyCXw',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = <TClient extends Client>(client: TClient): GASVacSmartContract<TClient> =>
  client.smartContract(definition);
