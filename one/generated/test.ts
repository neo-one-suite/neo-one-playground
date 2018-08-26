/* @hash 8d4d0bda129cfb4650a2e6f1bd60babb */
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
    [{ name: 'ICO', filePath: path.resolve(__dirname, '../contracts/ICO.ts') }],
    test,
    options,
  );
