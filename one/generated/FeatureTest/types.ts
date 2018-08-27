/* @hash f0ebbd6322170c26c2fd53bb3b4dda49 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  InvokeReceipt,
  InvokeTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionResult,
} from '@neo-one/client';

export type FeatureTestEvent = never;

export interface FeatureTestSmartContract extends SmartContract<FeatureTestReadSmartContract> {
  readonly consoleLog: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>>>;
  readonly deploy: (
    owner?: AddressString,
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>>>;
  readonly owner: () => Promise<AddressString>;
  readonly stackTrace: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>>>;
  readonly typeError: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>>>;
}

export interface FeatureTestReadSmartContract extends ReadSmartContract<FeatureTestEvent> {
  readonly owner: () => Promise<AddressString>;
}
