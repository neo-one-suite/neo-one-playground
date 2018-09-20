/* @hash 9a42dc0cd2626959b050d67647054b59 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { smartDonationABI } from './abi';
import { SmartDonationReadSmartContract, SmartDonationSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AcxC8BZquyMXJ2UqTf1hjTDEJqn1CyQM5c',
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
