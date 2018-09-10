/* @hash 56f0a8daadba0bbb2966e2d8cafc7df5 */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { escrowABI } from './abi';
import { EscrowReadSmartContract, EscrowSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AT3XbFk4tr524RrKZgx83Tc4H67wnZmA9b',
    },
  },
  abi: escrowABI,
  sourceMaps,
};

export const createEscrowSmartContract = (client: Client): EscrowSmartContract =>
  client.smartContract<EscrowSmartContract>(definition);

export const createEscrowReadSmartContract = (client: ReadClient): EscrowReadSmartContract =>
  client.smartContract<EscrowReadSmartContract>({
    address: definition.networks[client.dataProvider.network].address,
    abi: definition.abi,
    sourceMaps: definition.sourceMaps,
  });
