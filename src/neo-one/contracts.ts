/* @hash 2351677f24657a8bcb24d80f7fb72bfc */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';

import { EscrowSmartContract, EscrowMigrationSmartContract } from './Escrow/types';
import { FeatureTestSmartContract, FeatureTestMigrationSmartContract } from './FeatureTest/types';
import { GASVacSmartContract, GASVacMigrationSmartContract } from './GASVac/types';
import { OneSmartContract, OneMigrationSmartContract } from './One/types';
import { SmartDonationSmartContract, SmartDonationMigrationSmartContract } from './SmartDonation/types';
import { WrappedNEOSmartContract, WrappedNEOMigrationSmartContract } from './WrappedNEO/types';

import { createEscrowSmartContract } from './Escrow/contract';
import { createFeatureTestSmartContract } from './FeatureTest/contract';
import { createGASVacSmartContract } from './GASVac/contract';
import { createOneSmartContract } from './One/contract';
import { createSmartDonationSmartContract } from './SmartDonation/contract';
import { createWrappedNEOSmartContract } from './WrappedNEO/contract';

export interface Contracts<TClient extends Client = Client> {
  readonly escrow: EscrowSmartContract<TClient>;
  readonly featureTest: FeatureTestSmartContract<TClient>;
  readonly gasVac: GASVacSmartContract<TClient>;
  readonly one: OneSmartContract<TClient>;
  readonly smartDonation: SmartDonationSmartContract<TClient>;
  readonly wrappedNeo: WrappedNEOSmartContract<TClient>;
}

export interface MigrationContracts {
  readonly escrow: EscrowMigrationSmartContract;
  readonly featureTest: FeatureTestMigrationSmartContract;
  readonly gasVac: GASVacMigrationSmartContract;
  readonly one: OneMigrationSmartContract;
  readonly smartDonation: SmartDonationMigrationSmartContract;
  readonly wrappedNeo: WrappedNEOMigrationSmartContract;
}

export const createContracts = <TClient extends Client>(client: TClient): Contracts<TClient> => ({
  escrow: createEscrowSmartContract(client),
  featureTest: createFeatureTestSmartContract(client),
  gasVac: createGASVacSmartContract(client),
  one: createOneSmartContract(client),
  smartDonation: createSmartDonationSmartContract(client),
  wrappedNeo: createWrappedNEOSmartContract(client),
});
