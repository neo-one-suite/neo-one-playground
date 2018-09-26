/* @hash 5237b2dd0ba1cfe71e49ee417b525eb1 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { smartDonationABI } from './abi';
import { SmartDonationReadSmartContract, SmartDonationSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ARNYf4DjyqZpLeh4eAodfLBvgnz3tZQBzQ',
    },
  },
  abi: smartDonationABI,
  sourceMaps,
};

export const createSmartDonationSmartContract = (client: Client): SmartDonationSmartContract =>
  client.smartContract<SmartDonationSmartContract>(definition);

export const createSmartDonationReadSmartContract = (client: ReadClient): SmartDonationReadSmartContract =>
  client.smartContract<SmartDonationReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
