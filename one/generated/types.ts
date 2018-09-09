/* @hash a7788f0e23dfb1c62cb997346db7f6d3 */
// tslint:disable
/* eslint-disable */
import { FeatureTestSmartContract } from './FeatureTest/types';
import { OneSmartContract } from './One/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly featureTest: FeatureTestSmartContract;
  readonly one: OneSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
