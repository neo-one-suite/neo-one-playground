/* @hash e752792ae81a99ebd2a2da1e91c332b8 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Hash256String,
  InvocationTransaction,
  InvokeReceipt,
  InvokeSendTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';

export type FeatureTestEvent = never;

export interface FeatureTestSmartContract extends SmartContract<FeatureTestReadSmartContract> {
  readonly consoleLog: (
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>>;
  readonly deploy: (
    owner?: AddressString,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>, InvocationTransaction>>;
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: (
    transactionHash: Hash256String,
    options?: InvokeSendTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>, InvocationTransaction>>;
  readonly stackTrace: (
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>>;
  readonly typeError: (
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>>;
}

export interface FeatureTestReadSmartContract extends ReadSmartContract<FeatureTestEvent> {
  readonly owner: () => Promise<AddressString>;
}
