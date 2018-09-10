/* @hash 2b10429d6bc7d0401f85737c15b67dc0 */
// tslint:disable
/* eslint-disable */
import { FeatureTestSmartContract } from './FeatureTest/types';
import { GASVacSmartContract } from './GASVac/types';
import { OneSmartContract } from './One/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly featureTest: FeatureTestSmartContract;
  readonly gasVac: GASVacSmartContract;
  readonly one: OneSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
