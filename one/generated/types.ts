/* @hash a8267b7947a634fd633a1652af95db47 */
// tslint:disable
/* eslint-disable */
import { FeatureTestSmartContract } from './FeatureTest/types';
import { ICOSmartContract } from './ICO/types';
import { WrappedNEOSmartContract } from './WrappedNEO/types';

export interface Contracts {
  readonly featureTest: FeatureTestSmartContract;
  readonly ico: ICOSmartContract;
  readonly wrappedNeo: WrappedNEOSmartContract;
}
