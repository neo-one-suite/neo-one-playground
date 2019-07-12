/* @hash 8f641701b21258d8acc73bd777713e83 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { oneABI } from './abi';
import { OneSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AUFDAPSgENP4p58Qqq1Fqt4wdDfDhyQs7v',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = <TClient extends Client>(client: TClient): OneSmartContract<TClient> =>
  client.smartContract<OneSmartContract<TClient>>(definition);
