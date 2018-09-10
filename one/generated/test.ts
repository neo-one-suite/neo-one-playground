/* @hash 715698ec5f2b0397dd4cf9d4aefece56 */
// tslint:disable
/* eslint-disable */
import { TestOptions, withContracts as withContractsBase, WithContractsOptions } from '@neo-one/smart-contract-test';
import * as path from 'path';
import { Contracts } from './types';

export const withContracts = async (
  test: (contracts: Contracts & TestOptions) => Promise<void>,
  options?: WithContractsOptions,
): Promise<void> =>
  withContractsBase<Contracts>(
    [
      { name: 'FeatureTest', filePath: path.resolve(__dirname, '../contracts/FeatureTest.ts') },
      { name: 'GASVac', filePath: path.resolve(__dirname, '../contracts/GASVac.ts') },
      { name: 'One', filePath: path.resolve(__dirname, '../contracts/One.ts') },
      { name: 'WrappedNEO', filePath: path.resolve(__dirname, '../contracts/WrappedNEO.ts') },
    ],
    test,
    options,
  );
