/* @hash c43c004d5278597278dedc93ff75b222 */
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

export type GASVacEvent = never;

export interface GASVacSmartContract extends SmartContract<GASVacReadSmartContract> {
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, GASVacEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, GASVacEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, GASVacEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (transactionHash: Hash256String, options?: InvokeSendTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, GASVacEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly vacuum: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, GASVacEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (address: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, GASVacEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}

export interface GASVacReadSmartContract extends ReadSmartContract<GASVacEvent> {}
