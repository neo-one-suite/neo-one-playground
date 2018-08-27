/* @hash 40b9016004849cbe1309cf62f34c84e5 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  BufferString,
  InvokeReceipt,
  InvokeTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionResult,
} from '@neo-one/client';

export type FeatureTestEvent = {};

export interface FeatureTestSmartContract extends SmartContract<FeatureTestReadSmartContract> {
  readonly consoleLog: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<BufferString, FeatureTestEvent>>>;
  readonly deploy: (
    owner?: AddressString,
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>>>;
  readonly owner: () => Promise<AddressString>;
  readonly stackTrace: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<BufferString, FeatureTestEvent>>>;
  readonly typeError: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<BufferString, FeatureTestEvent>>>;
}

export interface FeatureTestReadSmartContract extends ReadSmartContract<FeatureTestEvent> {
  readonly owner: () => Promise<AddressString>;
}
