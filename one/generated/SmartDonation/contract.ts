/* @hash 70e58d3dda630385fa8124637360cc1d */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { smartDonationABI } from './abi';
import { SmartDonationReadSmartContract, SmartDonationSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AM536EujTf58gev8q6m8koG9v7JVBJVHgZ',
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
