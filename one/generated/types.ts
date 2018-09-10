/* @hash 2179c36fa79c65438ecb7d130aba9e67 */
// tslint:disable
/* eslint-disable */
import { EscrowSmartContract } from './Escrow/types';
import { FeatureTestSmartContract } from './FeatureTest/types';
import { GASVacSmartContract } from './GASVac/types';
import { OneSmartContract } from './One/types';
import { SlotsSmartContract } from './Slots/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly escrow: EscrowSmartContract;
  readonly featureTest: FeatureTestSmartContract;
  readonly gasVac: GASVacSmartContract;
  readonly one: OneSmartContract;
  readonly slots: SlotsSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
