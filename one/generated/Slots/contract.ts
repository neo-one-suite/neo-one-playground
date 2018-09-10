/* @hash 965bcc513810335962ea10e884c9177f */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { slotsABI } from './abi';
import { SlotsReadSmartContract, SlotsSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ARNwFpsZg1j9jrh5Ng5Ng7VfdyhHzZty2p',
    },
  },
  abi: slotsABI,
  sourceMaps,
};

export const createSlotsSmartContract = (client: Client): SlotsSmartContract =>
  client.smartContract<SlotsSmartContract>(definition);

export const createSlotsReadSmartContract = (client: ReadClient): SlotsReadSmartContract =>
  client.smartContract<SlotsReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
