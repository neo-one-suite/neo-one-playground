/* @hash ebfd60586f6c782c9f058efe076dcce8 */
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

export interface SmartDonationTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface SmartDonationTransferEvent extends Event<'transfer', SmartDonationTransferEventParameters> {}
export interface SmartDonationApproveSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface SmartDonationApproveSendTransferEvent
  extends Event<'approveSendTransfer', SmartDonationApproveSendTransferEventParameters> {}
export interface SmartDonationRevokeSendTransferEventParameters {
  readonly from: AddressString;
  readonly to: AddressString;
  readonly amount: BigNumber;
}
export interface SmartDonationRevokeSendTransferEvent
  extends Event<'revokeSendTransfer', SmartDonationRevokeSendTransferEventParameters> {}
export type SmartDonationEvent =
  | SmartDonationTransferEvent
  | SmartDonationApproveSendTransferEvent
  | SmartDonationRevokeSendTransferEvent;

export interface SmartDonationSmartContract extends SmartContract<SmartDonationReadSmartContract> {
  readonly approveReceiveTransfer: {
    (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      to: AddressString,
      message: string,
      options?: TransactionOptions,
    ): Promise<TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>>;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        to: AddressString,
        message: string,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly forwardApproveReceiveTransferArgs: (to: AddressString, message: string) => [ForwardValue, ForwardValue];
  readonly collect: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (address: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly deploy: {
    (owner?: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (owner?: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly getBalance: (address: AddressString) => Promise<BigNumber>;
  readonly getContributorAmount: (source: AddressString, contributor: AddressString) => Promise<BigNumber>;
  readonly getContributorMessage: (source: AddressString, contributor: AddressString) => Promise<string>;
  readonly getCurrentBalance: (address: AddressString) => Promise<BigNumber>;
  readonly getMessage: (address: AddressString) => Promise<string>;
  readonly getTopContributor: (address: AddressString) => Promise<AddressString>;
  readonly getTopContributorMessage: (address: AddressString) => Promise<string>;
  readonly onRevokeSendTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        from: AddressString,
        amount: BigNumber,
        asset: AddressString,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly owner: () => Promise<AddressString>;
  readonly refundAssets: {
    (transactionHash: Hash256String, options?: InvokeSendTransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (transactionHash: Hash256String, options?: InvokeSendTransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly setupContributions: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (address: AddressString, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
  readonly updateContributorMessage: {
    (source: AddressString, contributor: AddressString, message: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (
        source: AddressString,
        contributor: AddressString,
        message: string,
        options?: TransactionOptions & GetOptions,
      ): Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
    };
  };
  readonly updateMessage: {
    (address: AddressString, message: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (address: AddressString, message: string, options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}

export interface SmartDonationReadSmartContract extends ReadSmartContract<SmartDonationEvent> {
  readonly getBalance: (address: AddressString) => Promise<BigNumber>;
  readonly getContributorAmount: (source: AddressString, contributor: AddressString) => Promise<BigNumber>;
  readonly getContributorMessage: (source: AddressString, contributor: AddressString) => Promise<string>;
  readonly getCurrentBalance: (address: AddressString) => Promise<BigNumber>;
  readonly getMessage: (address: AddressString) => Promise<string>;
  readonly getTopContributor: (address: AddressString) => Promise<AddressString>;
  readonly getTopContributorMessage: (address: AddressString) => Promise<string>;
  readonly owner: () => Promise<AddressString>;
}
