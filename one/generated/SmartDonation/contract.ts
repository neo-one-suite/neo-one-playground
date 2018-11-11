/* @hash 97e734446d381f30ed45fb93427e6d26 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { smartDonationABI } from './abi';
import { SmartDonationSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ARRZQjwjvuDJXKzqxqroTMmu2xWBkBzw4X',
    },
  },
  abi: smartDonationABI,
  sourceMaps,
};

export const createSmartDonationSmartContract = <TClient extends Client>(
  client: TClient,
): SmartDonationSmartContract<TClient> => client.smartContract<SmartDonationSmartContract<TClient>>(definition);
