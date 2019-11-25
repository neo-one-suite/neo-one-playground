/* @hash f8fcecafc644487b709e37ec2d9b9ce5 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { FeatureTestSmartContract } from './types';
import { featureTestABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AV7CdHbBhN56g8GLCDVS7LntxPAbJfnFio',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = <TClient extends Client>(
  client: TClient,
): FeatureTestSmartContract<TClient> => client.smartContract(definition);
