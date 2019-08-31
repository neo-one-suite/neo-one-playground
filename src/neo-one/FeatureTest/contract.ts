/* @hash 3dfdb3a7c46da65252bb415dacab967b */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { FeatureTestSmartContract } from './types';
import { featureTestABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'ATAP39YDztANYijzNjX1xcV2NJ4bXx4uwz',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = <TClient extends Client>(
  client: TClient,
): FeatureTestSmartContract<TClient> => client.smartContract(definition);
