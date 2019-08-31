/* @hash 8c71fb9c26182e7e04af4e4d28f1cae2 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { OneSmartContract } from './types';
import { oneABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AUFDAPSgENP4p58Qqq1Fqt4wdDfDhyQs7v',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = <TClient extends Client>(client: TClient): OneSmartContract<TClient> =>
  client.smartContract(definition);
