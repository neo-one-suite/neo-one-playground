/* @hash 0d839ecf23a570fc7c535f64bf14afa0 */
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
import BigNumber from 'bignumber.js';

export type SlotsEvent = never;

export interface SlotsSmartContract extends SmartContract<SlotsReadSmartContract> {
  readonly deploy: {
    (owner?: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SlotsEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (owner?: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SlotsEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SlotsEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (transactionHash: Hash256String, options?: InvokeSendTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SlotsEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly spin: (wager: BigNumber, spinCount: BigNumber, address: UserAccount) => Promise<Array<BigNumber>>;
}

export interface SlotsReadSmartContract extends ReadSmartContract<SlotsEvent> {
  readonly owner: () => Promise<AddressString>;
  readonly spin: (wager: BigNumber, spinCount: BigNumber, address: AddressString) => Promise<Array<BigNumber>>;
}
