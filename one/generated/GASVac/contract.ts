/* @hash 28e51ab2f1581bdb4118925a85aa99fa */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { gasVacABI } from './abi';
import { GASVacSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AWCNJ3LeiQmN4oamRtp1wWrSuvd5bmp4cY',
    },
  },
  abi: gasVacABI,
  sourceMaps,
};

export const createGASVacSmartContract = <TClient extends Client>(client: TClient): GASVacSmartContract<TClient> =>
  client.smartContract<GASVacSmartContract<TClient>>(definition);
