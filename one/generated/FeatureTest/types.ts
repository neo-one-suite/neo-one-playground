/* @hash 27124fd9c04489f27c5d4e106442eee2 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  GetOptions,
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
  readonly consoleLog: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly deploy: {
    (owner?: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      owner?: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      transactionHash: Hash256String,
      options?: InvokeSendTransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly stackTrace: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly typeError: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  };
}

export interface FeatureTestReadSmartContract extends ReadSmartContract<FeatureTestEvent> {
  readonly owner: () => Promise<AddressString>;
}
