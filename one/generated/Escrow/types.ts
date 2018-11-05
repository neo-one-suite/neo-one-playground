/* @hash 5e058556bbe231cee70c7075aeeb29bd */
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

export interface EscrowSmartContract<TClient extends Client = Client> extends SmartContract<TClient, EscrowEvent> {
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
  readonly forwardApproveReceiveTransferArgs: (to: AddressString) => [ForwardOptions<EscrowEvent>, ForwardValue];
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
