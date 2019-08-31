/* @hash 76ae46024eee49c732ccb4a180a8e176 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { SmartDonationSmartContract } from './types';
import { smartDonationABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AMzRzAHxtZAMPjvauLhcG8RzPT7JxqiZVk',
    },
  },
  abi: smartDonationABI,
  sourceMaps,
};

export const createSmartDonationSmartContract = <TClient extends Client>(
  client: TClient,
): SmartDonationSmartContract<TClient> => client.smartContract(definition);
