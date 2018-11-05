/* @hash 377b122ecb324bcdd940559969188233 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { featureTestABI } from './abi';
import { FeatureTestSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ARzfjabSPmxtTvN9pzwkFyUnrzKEBrAyoC',
    },
  },
  abi: featureTestABI,
  sourceMaps,
};

export const createFeatureTestSmartContract = <TClient extends Client>(
  client: TClient,
): FeatureTestSmartContract<TClient> => client.smartContract<FeatureTestSmartContract<TClient>>(definition);
