/* @hash 2654c3b95c464875342b037ff433c5fe */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { escrowABI } from './abi';
import { EscrowSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AeL9vXfSbatsxbSowRyzbVDZunBhGYdrtP',
    },
  },
  abi: escrowABI,
  sourceMaps,
};

export const createEscrowSmartContract = <TClient extends Client>(client: TClient): EscrowSmartContract<TClient> =>
  client.smartContract<EscrowSmartContract<TClient>>(definition);
