/* @hash 4b12b0f58641906233c577b9a5d6e101 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { EscrowSmartContract } from './types';
import { escrowABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AP93Pi5NwjHsaE5L3wc2hDvd6tmweejsCW',
    },
  },
  abi: escrowABI,
  sourceMaps,
};

export const createEscrowSmartContract = <TClient extends Client>(client: TClient): EscrowSmartContract<TClient> =>
  client.smartContract(definition);
