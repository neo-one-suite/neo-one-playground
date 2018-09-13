/* @hash d914addc49641c87f4a564f5fb38f433 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { slotsABI } from './abi';
import { SlotsReadSmartContract, SlotsSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'ALx8sMD7eyiuTvHmVSHjvmcnZUt8zdkiNf',
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
