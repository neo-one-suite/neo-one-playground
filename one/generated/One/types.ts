/* @hash 6b79c9a51ae66d0b2e1fa494f82ed125 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Client,
  Event,
  ForwardOptions,
  ForwardValue,
  GetOptions,
  InvocationTransaction,
  InvokeReceipt,
  InvokeReceiveTransactionOptions,
  InvokeSendUnsafeTransactionOptions,
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

export interface OneSmartContract<TClient extends Client = Client> extends SmartContract<TClient, OneEvent> {
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
    (options?: InvokeSendUnsafeTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, OneEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: InvokeSendUnsafeTransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, OneEvent> & { readonly transaction: InvocationTransaction }
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
    <TForwardOptions extends ForwardOptions<any>>(
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      forwardOptions?: TForwardOptions,
      ...approveArgs: ForwardValue[]
    ): Promise<
      TransactionResult<
        InvokeReceipt<boolean, TForwardOptions extends ForwardOptions<infer T> ? OneEvent | T : OneEvent>,
        InvocationTransaction
      >
    >;
    <TForwardOptions extends ForwardOptions<any>>(
      from: AddressString,
      to: AddressString,
      amount: BigNumber,
      options?: TransactionOptions,
      forwardOptions?: TForwardOptions,
      ...approveArgs: ForwardValue[]
    ): Promise<
      TransactionResult<
        InvokeReceipt<boolean, TForwardOptions extends ForwardOptions<infer T> ? OneEvent | T : OneEvent>,
        InvocationTransaction
      >
    >;
    readonly confirmed: {
      <TForwardOptions extends ForwardOptions<any>>(
        from: AddressString,
        to: AddressString,
        amount: BigNumber,
        forwardOptions?: TForwardOptions,
        ...approveArgs: ForwardValue[]
      ): Promise<
        InvokeReceipt<boolean, TForwardOptions extends ForwardOptions<infer T> ? OneEvent | T : OneEvent> & {
          readonly transaction: InvocationTransaction;
        }
      >;
      <TForwardOptions extends ForwardOptions<any>>(
        from: AddressString,
        to: AddressString,
        amount: BigNumber,
        options?: TransactionOptions & GetOptions,
        forwardOptions?: TForwardOptions,
        ...approveArgs: ForwardValue[]
      ): Promise<
        InvokeReceipt<boolean, TForwardOptions extends ForwardOptions<infer T> ? OneEvent | T : OneEvent> & {
          readonly transaction: InvocationTransaction;
        }
      >;
    };
  };
}
