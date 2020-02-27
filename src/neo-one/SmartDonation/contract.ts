/* @hash 2fd483801ba56a4bef7c0b2e4f4433f3 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { SmartDonationSmartContract } from './types';
import { smartDonationABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AKGMWmM3rrjcaJ76H6HdTo9D6V8UU4pMW6',
    },
  },
  abi: smartDonationABI,
  sourceMaps,
};

export const createSmartDonationSmartContract = <TClient extends Client>(
  client: TClient,
): SmartDonationSmartContract<TClient> => client.smartContract(definition);
