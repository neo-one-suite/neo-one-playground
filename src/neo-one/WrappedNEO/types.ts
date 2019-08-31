/* @hash 498d3984f5f854e031c69a0cfe364106 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Client,
  Event,
  GetOptions,
  Hash256String,
  InvocationTransaction,
  InvokeReceipt,
  InvokeReceiveTransactionOptions,
  InvokeSendUnsafeTransactionOptions,
  SmartContract,
  TransactionOptions,
  TransactionResult,
  Transfer,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

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
export type WrappedNEOEvent =
  | WrappedNEOTransferEvent
  | WrappedNEOApproveSendTransferEvent
  | WrappedNEORevokeSendTransferEvent;

export interface WrappedNEOSmartContract<TClient extends Client = Client>
  extends SmartContract<TClient, WrappedNEOEvent> {
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
  readonly completeSend: {
    (hash: Hash256String, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      hash: Hash256String,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  };
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
    (options?: InvokeSendUnsafeTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: InvokeSendUnsafeTransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
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
    (transfer: Transfer, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, WrappedNEOEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      transfer: Transfer,
      options?: TransactionOptions & GetOptions,
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

export interface WrappedNEOMigrationSmartContract {
  readonly approveReceiveTransfer: (
    from: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    asset: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly approveSendTransfer: (
    from: AddressString | Promise<AddressString>,
    to: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly approvedTransfer: (
    from: AddressString | Promise<AddressString>,
    to: AddressString | Promise<AddressString>,
  ) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString | Promise<AddressString>) => Promise<BigNumber>;
  readonly completeSend: (
    hash: Hash256String,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly name: () => Promise<string>;
  readonly onRevokeSendTransfer: (
    from: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    asset: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly refundAssets: (
    options?: InvokeSendUnsafeTransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly revokeSendTransfer: (
    from: AddressString | Promise<AddressString>,
    to: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: (
    from: AddressString | Promise<AddressString>,
    to: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly unwrapNEO: (
    transfer: Transfer,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
  readonly wrapNEO: (
    options?: InvokeReceiveTransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, WrappedNEOEvent> & { readonly transaction: InvocationTransaction }>;
}
