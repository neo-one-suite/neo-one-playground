/* @hash 7e9e1906b4d773ee1c382c4e93b77a33 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { smartDonationABI } from './abi';
import { SmartDonationSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
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
): SmartDonationSmartContract<TClient> => client.smartContract<SmartDonationSmartContract<TClient>>(definition);
