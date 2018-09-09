/* @hash 4ba54ec2a65d9edb79c1ebebdbae9bcc */
// tslint:disable
/* eslint-disable */
import { Client, ReadClient, SmartContractDefinition } from '@neo-one/client';
import { escrowABI } from './abi';
import { EscrowReadSmartContract, EscrowSmartContract } from './types';
import { sourceMaps } from '../sourceMaps';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AUKKxb7c6FFvdr8RRYqNYr91t3SiXy57Hd',
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
