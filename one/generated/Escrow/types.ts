/* @hash 36fc0e80c51c881e163d59dad4950478 */
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
  InvokeSendTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

export interface EscrowTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface EscrowTransferEvent extends Event<'transfer', EscrowTransferEventParameters> {}
export interface EscrowApproveSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface EscrowApproveSendTransferEvent
  extends Event<'approveSendTransfer', EscrowApproveSendTransferEventParameters> {}
export interface EscrowRevokeSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface EscrowRevokeSendTransferEvent
  extends Event<'revokeSendTransfer', EscrowRevokeSendTransferEventParameters> {}
export type EscrowEvent = EscrowTransferEvent | EscrowApproveSendTransferEvent | EscrowRevokeSendTransferEvent;

export interface EscrowSmartContract extends SmartContract<EscrowReadSmartContract> {
  readonly approveReceiveTransfer: {
    (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      to: AddressString,
      options?: TransactionOptions,
    ): Promise<TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>>;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        to: AddressString,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly forwardApproveReceiveTransferArgs: (to: AddressString) => [ForwardValue];
  readonly balanceOf: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly onRevokeSendTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<undefined, EscrowEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly receiveONE: {
    (from: AddressString, to: AddressString, amount?: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (from: AddressString, to: AddressString, amount?: BigNumber, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (transactionHash: Hash256String, options?: InvokeSendTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly revokeONE: {
    (from: AddressString, to: AddressString, amount?: BigNumber, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (from: AddressString, to: AddressString, amount?: BigNumber, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}

export interface EscrowReadSmartContract extends ReadSmartContract<EscrowEvent> {
  readonly balanceOf: (from: AddressString, to: AddressString) => Promise<BigNumber>;
}
