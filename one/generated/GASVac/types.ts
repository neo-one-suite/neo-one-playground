/* @hash 0a2177676fc900ee1b80978359afb811 */
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
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
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
