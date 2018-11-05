/* @hash ce31b5d24a5def331a9bfdedbfad0a76 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { oneABI } from './abi';
import { OneSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AQWbfhkXSStBh2CAwWwx8neLm9MvNc7k27',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = <TClient extends Client>(client: TClient): OneSmartContract<TClient> =>
  client.smartContract<OneSmartContract<TClient>>(definition);
