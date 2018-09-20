/* @hash f2fe94621ec06fe25a9314580ebdb5c2 */
// tslint:disable
/* eslint-disable */
import { EscrowSmartContract } from './Escrow/types';
import { FeatureTestSmartContract } from './FeatureTest/types';
import { GASVacSmartContract } from './GASVac/types';
import { OneSmartContract } from './One/types';
import { SmartDonationSmartContract } from './SmartDonation/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly escrow: EscrowSmartContract;
  readonly featureTest: FeatureTestSmartContract;
  readonly gasVac: GASVacSmartContract;
  readonly one: OneSmartContract;
  readonly smartDonation: SmartDonationSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
