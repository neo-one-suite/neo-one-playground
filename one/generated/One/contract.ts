/* @hash b0fb05f9d1293b3f85574f791e7bc897 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { oneABI } from './abi';
import { OneSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ALP1sxYYG5fFKvmsAdKfQQ7nQtSdKVvtzi',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = <TClient extends Client>(client: TClient): OneSmartContract<TClient> =>
  client.smartContract<OneSmartContract<TClient>>(definition);
