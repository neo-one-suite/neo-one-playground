/* @hash b63ffd847b399608cb2122767a1b047c */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { slotsABI } from './abi';
import { SlotsReadSmartContract, SlotsSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AQX4LXTANLMuMxShwurXYo96bY644WfuL5',
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
