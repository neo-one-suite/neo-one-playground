/* @hash 4801e32db015bc5f62a838f07e290214 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Event,
  ForwardValue,
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

export interface OneTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface OneTransferEvent extends Event<'transfer', OneTransferEventParameters> {}
export interface OneApproveSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface OneApproveSendTransferEvent
  extends Event<'approveSendTransfer', OneApproveSendTransferEventParameters> {}
export interface OneRevokeSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface OneRevokeSendTransferEvent extends Event<'revokeSendTransfer', OneRevokeSendTransferEventParameters> {}
export type OneEvent = OneTransferEvent | OneApproveSendTransferEvent | OneRevokeSendTransferEvent;

export interface OneSmartContract extends SmartContract<OneReadSmartContract> {
  readonly amountPerNEO: () => Promise<BigNumber>;
  readonly approveReceiveTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly approveSendTransfer: {
    (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: {
    (
      owner?: AddressString,
      icoStartTimeSeconds?: BigNumber,
      icoDurationSeconds?: BigNumber,
      options?: TransactionOptions,
    ): Promise<TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>>;
    readonly confirmed: {
      (
        owner?: AddressString,
        icoStartTimeSeconds?: BigNumber,
        icoDurationSeconds?: BigNumber,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly icoDurationSeconds: () => Promise<BigNumber>;
  readonly icoStartTimeSeconds: () => Promise<BigNumber>;
  readonly mintTokens: {
    (options?: InvokeReceiveTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: InvokeReceiveTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly name: () => Promise<string>;
  readonly onRevokeSendTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<undefined, OneEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (transactionHash: Hash256String, options?: InvokeSendTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly remaining: () => Promise<BigNumber>;
  readonly revokeSendTransfer: {
    (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (from: AddressString, to: AddressString, amount: BigNumber, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: {
    (
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      options?: TransactionOptions,
      ...approveArgs: ForwardValue[]
    ): Promise<TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>>;
    (from: AddressString, to: AddressString, amount: BigNumber, ...approveArgs: ForwardValue[]): Promise<
      TransactionResult<InvokeReceipt<boolean, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        from: AddressString,
        to: AddressString,
        amount: BigNumber,
        options?: TransactionOptions & GetOptions,
        ...approveArgs: ForwardValue[]
      ): Promise<InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }>;
      (from: AddressString, to: AddressString, amount: BigNumber, ...approveArgs: ForwardValue[]): Promise<
        InvokeReceipt<boolean, OneEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}

export interface OneReadSmartContract extends ReadSmartContract<OneEvent> {
  readonly amountPerNEO: () => Promise<BigNumber>;
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly icoDurationSeconds: () => Promise<BigNumber>;
  readonly icoStartTimeSeconds: () => Promise<BigNumber>;
  readonly name: () => Promise<string>;
  readonly owner: () => Promise<AddressString>;
  readonly remaining: () => Promise<BigNumber>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
}
