/* @hash efd10492bcd2faef71614bc1df0d50be */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Event,
  InvokeReceipt,
  InvokeTransactionOptions,
  ReadSmartContract,
  SmartContract,
  TransactionResult,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

export type ICOEvent = ICOTransferEvent | ICORefundEvent;

export interface ICOTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface ICOTransferEvent extends Event<'transfer', ICOTransferEventParameters> {}
export interface ICORefundEventParameters {}
export interface ICORefundEvent extends Event<'refund', ICORefundEventParameters> {}

export interface ICOSmartContract extends SmartContract<ICOReadSmartContract> {
  readonly amountPerNEO: () => Promise<BigNumber>;
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: (
    owner?: AddressString,
    startTimeSeconds?: BigNumber,
    icoDurationSeconds?: BigNumber,
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>>>;
  readonly icoDurationSeconds: () => Promise<BigNumber>;
  readonly mintTokens: (
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>>>;
  readonly name: () => Promise<string>;
  readonly owner: () => Promise<AddressString>;
  readonly remaining: () => Promise<BigNumber>;
  readonly startTimeSeconds: () => Promise<BigNumber>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: (
    from: AddressString,
    to: AddressString,
    amount: BigNumber,
    options?: InvokeTransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, ICOEvent>>>;
}

export interface ICOReadSmartContract extends ReadSmartContract<ICOEvent> {
  readonly amountPerNEO: () => Promise<BigNumber>;
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
