/* @hash 8c1b1fa4d3e017cfa6b34ab40dfb569a */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Client,
  GetOptions,
  InvocationTransaction,
  InvokeReceipt,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';

export type FeatureTestEvent = never;

export interface FeatureTestSmartContract<TClient extends Client = Client>
  extends SmartContract<TClient, FeatureTestEvent> {
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

export interface FeatureTestMigrationSmartContract {
  readonly consoleLog: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  readonly deploy: (
    owner?: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  readonly owner: () => Promise<AddressString>;
  readonly stackTrace: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
  readonly typeError: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }>;
}
