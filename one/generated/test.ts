/* @hash 86d7a3445d94d6b449d4db391ce4dba7 */
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
      { name: 'One', filePath: path.resolve(__dirname, '../contracts/One.ts') },
      { name: 'FeatureTest', filePath: path.resolve(__dirname, '../contracts/FeatureTest.ts') },
      { name: 'GASVac', filePath: path.resolve(__dirname, '../contracts/GASVac.ts') },
      { name: 'WrappedNEO', filePath: path.resolve(__dirname, '../contracts/WrappedNEO.ts') },
      { name: 'Escrow', filePath: path.resolve(__dirname, '../contracts/Escrow.ts') },
    ],
    test,
    options,
  );
