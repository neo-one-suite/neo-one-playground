/* @hash 6237a4bb49226ceb88f4f27f2ad4f628 */
// tslint:disable
/* eslint-disable */
import { createWithContracts, TestOptions, WithContractsOptions } from '@neo-one/smart-contract-test';
import { Contracts } from './contracts';
import * as path from 'path';

export const withContracts: (
  test: (contracts: Contracts & TestOptions) => Promise<void>,
  options?: WithContractsOptions,
) => Promise<void> = createWithContracts([
  { name: 'One', filePath: path.resolve(__dirname, '../../neo-one/contracts/One.ts') },
  { name: 'FeatureTest', filePath: path.resolve(__dirname, '../../neo-one/contracts/FeatureTest.ts') },
  { name: 'GASVac', filePath: path.resolve(__dirname, '../../neo-one/contracts/GASVac.ts') },
  { name: 'WrappedNEO', filePath: path.resolve(__dirname, '../../neo-one/contracts/WrappedNEO.ts') },
  { name: 'Escrow', filePath: path.resolve(__dirname, '../../neo-one/contracts/Escrow.ts') },
  { name: 'SmartDonation', filePath: path.resolve(__dirname, '../../neo-one/contracts/SmartDonation.ts') },
]);
