/* @hash c2e032c6bf280c83cdaeefaf632baf1c */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { wrappedNeoABI } from './abi';
import { WrappedNEOSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AZLGrGeuXPk9oDESzXk6j8quvJMGfh6CN3',
    },
  },
  abi: wrappedNeoABI,
  sourceMaps,
};

export const createWrappedNEOSmartContract = <TClient extends Client>(
  client: TClient,
): WrappedNEOSmartContract<TClient> => client.smartContract<WrappedNEOSmartContract<TClient>>(definition);
