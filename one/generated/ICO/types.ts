/* @hash 0c7329ca61ef9f37c113d098965ba27e */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Event,
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

export type ICOEvent = ICOTransferEvent | ICOApproveSendTransferEvent | ICORevokeSendTransferEvent;

export interface ICOTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface ICOTransferEvent extends Event<'transfer', ICOTransferEventParameters> {}
export interface ICOApproveSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface ICOApproveSendTransferEvent
  extends Event<'approveSendTransfer', ICOApproveSendTransferEventParameters> {}
export interface ICORevokeSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface ICORevokeSendTransferEvent extends Event<'revokeSendTransfer', ICORevokeSendTransferEventParameters> {}

export interface ICOSmartContract extends SmartContract<ICOReadSmartContract> {
  readonly amountPerNEO: () => Promise<BigNumber>;
  readonly approveReceiveTransfer: (
    from: AddressString,
    amount: BigNumber,
    asset: AddressString,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly approveSendTransfer: (
    from: AddressString,
    to: AddressString,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: (
    owner?: AddressString,
    startTimeSeconds?: BigNumber,
    icoDurationSeconds?: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly icoDurationSeconds: () => Promise<BigNumber>;
  readonly mintTokens: (
    options?: InvokeReceiveTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly name: () => Promise<string>;
  readonly onRevokeSendTransfer: (
    from: AddressString,
    amount: BigNumber,
    asset: AddressString,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<undefined, ICOEvent>, InvocationTransaction>>;
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: (
    transactionHash: Hash256String,
    options?: InvokeSendTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly remaining: () => Promise<BigNumber>;
  readonly revokeSendTransfer: (
    from: AddressString,
    to: AddressString,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
  readonly startTimeSeconds: () => Promise<BigNumber>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: (
    from: AddressString,
    to: AddressString,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>, InvocationTransaction>>;
}

export interface ICOReadSmartContract extends ReadSmartContract<ICOEvent> {
  readonly amountPerNEO: () => Promise<BigNumber>;
  readonly approvedTransfer: (from: AddressString, to: AddressString) => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly icoDurationSeconds: () => Promise<BigNumber>;
  readonly name: () => Promise<string>;
  readonly owner: () => Promise<AddressString>;
  readonly remaining: () => Promise<BigNumber>;
  readonly startTimeSeconds: () => Promise<BigNumber>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
}
