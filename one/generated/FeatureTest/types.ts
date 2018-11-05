/* @hash a20d11acd7500636889aa584d2911e75 */
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
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly deploy: {
    (owner?: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (owner?: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, FeatureTestEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly owner: () => Promise<AddressString>;
  readonly stackTrace: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly typeError: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, FeatureTestEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, FeatureTestEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}
