/* @hash 8bafccb2021415340cb21e0c6b00223e */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Event,
  GetOptions,
  Hash256String,
  InvocationTransaction,
  InvokeReceipt,
  InvokeReceiveTransactionOptions,
  InvokeSendTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

export type WrappedNEOEvent =
  | WrappedNEOTransferEvent
  | WrappedNEOApproveSendTransferEvent
  | WrappedNEORevokeSendTransferEvent;

export interface WrappedNEOTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface WrappedNEOTransferEvent extends Event<'transfer', WrappedNEOTransferEventParameters> {}
export interface WrappedNEOApproveSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface WrappedNEOApproveSendTransferEvent
  extends Event<'approveSendTransfer', WrappedNEOApproveSendTransferEventParameters> {}
export interface WrappedNEORevokeSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface WrappedNEORevokeSendTransferEvent
  extends Event<'revokeSendTransfer', WrappedNEORevokeSendTransferEventParameters> {}

export interface WrappedNEOSmartContract extends SmartContract<WrappedNEOReadSmartContract> {
  readonly approveReceiveTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly approveSendTransfer: {
    (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly name: () => Promise<string>;
  readonly onRevokeSendTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      transactionHash: Hash256String,
      options?: InvokeSendTransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly revokeSendTransfer: {
    (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: {
    (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly unwrapNEO: {
    (receiver: AddressString, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      receiver: AddressString,
      options?: InvokeSendTransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly wrapNEO: {
    (options?: InvokeReceiveTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: InvokeReceiveTransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
}

export interface WrappedNEOReadSmartContract extends ReadSmartContract<WrappedNEOEvent> {
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly name: () => Promise<string>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
}
