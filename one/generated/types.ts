/* @hash 6f9aec012193a55b97231da644e3ea14 */
// tslint:disable
/* eslint-disable */
import { FeatureTestSmartContract } from './FeatureTest/types';
import { ICOSmartContract } from './ICO/types';

export interface Contracts {
  readonly featureTest: FeatureTestSmartContract;
  readonly ico: ICOSmartContract;
}
