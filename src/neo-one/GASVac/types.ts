/* @hash a1a5b4b9d6a290d480e281f735ac1e1d */
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

export type GASVacEvent = never;

export interface GASVacSmartContract<TClient extends Client = Client> extends SmartContract<TClient, GASVacEvent> {
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, GASVacEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, GASVacEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly vacuum: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, GASVacEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      address: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, GASVacEvent> & { readonly transaction: InvocationTransaction }>;
  };
}

export interface GASVacMigrationSmartContract {
  readonly deploy: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, GASVacEvent> & { readonly transaction: InvocationTransaction }>;
  readonly vacuum: (
    address: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, GASVacEvent> & { readonly transaction: InvocationTransaction }>;
}
