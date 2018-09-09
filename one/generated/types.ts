/* @hash 7ba30294f40cb75aadd2779c4c0686f0 */
// tslint:disable
/* eslint-disable */
import { EscrowSmartContract } from './Escrow/types';
import { FeatureTestSmartContract } from './FeatureTest/types';
import { GASVacSmartContract } from './GASVac/types';
import { OneSmartContract } from './One/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly escrow: EscrowSmartContract;
  readonly featureTest: FeatureTestSmartContract;
  readonly gasVac: GASVacSmartContract;
  readonly one: OneSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
