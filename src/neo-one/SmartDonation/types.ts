/* @hash 775f4c08b2cedeb6182347f93315e591 */
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

export interface SmartDonationSmartContract<TClient extends Client = Client>
  extends SmartContract<TClient, SmartDonationEvent> {
  readonly approveReceiveTransfer: {
    (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      to: AddressString,
      message: string,
      options?: TransactionOptions,
    ): Promise<TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>>;
    readonly confirmed: (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      to: AddressString,
      message: string,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly forwardApproveReceiveTransferArgs: (
    to: AddressString,
    message: string,
  ) => [ForwardOptions<SmartDonationEvent>, ForwardValue, ForwardValue];
  readonly collect: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      address: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly deploy: {
    (owner?: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      owner?: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly getContributionInfo: (
    source: AddressString,
    contributor: AddressString,
  ) => Promise<{
    readonly amount: BigNumber;
    readonly message: string;
  }>;
  readonly getDonationInfo: (
    source: AddressString,
  ) => Promise<{
    readonly message: string;
    readonly balance: BigNumber;
    readonly currentBalance: BigNumber;
    readonly topContributor: AddressString;
  }>;
  readonly getTopContributorMessage: (address: AddressString) => Promise<string>;
  readonly onRevokeSendTransfer: {
    (from: AddressString, amount: BigNumber, asset: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      from: AddressString,
      amount: BigNumber,
      asset: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly owner: () => Promise<AddressString>;
  readonly setupContributions: {
    (address: AddressString, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<undefined, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      address: AddressString,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly updateContributorMessage: {
    (source: AddressString, contributor: AddressString, message: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      source: AddressString,
      contributor: AddressString,
      message: string,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly updateMessage: {
    (address: AddressString, message: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, SmartDonationEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      address: AddressString,
      message: string,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  };
}

export interface SmartDonationMigrationSmartContract {
  readonly approveReceiveTransfer: (
    from: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    asset: AddressString | Promise<AddressString>,
    to: AddressString | Promise<AddressString>,
    message: string | Promise<string>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly forwardApproveReceiveTransferArgs: (
    to: AddressString | Promise<AddressString>,
    message: string | Promise<string>,
  ) => [ForwardOptions<SmartDonationEvent>, ForwardValue, ForwardValue];
  readonly collect: (
    address: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly deploy: (
    owner?: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly getContributionInfo: (
    source: AddressString | Promise<AddressString>,
    contributor: AddressString | Promise<AddressString>,
  ) => Promise<{
    readonly amount: BigNumber;
    readonly message: string;
  }>;
  readonly getDonationInfo: (
    source: AddressString | Promise<AddressString>,
  ) => Promise<{
    readonly message: string;
    readonly balance: BigNumber;
    readonly currentBalance: BigNumber;
    readonly topContributor: AddressString;
  }>;
  readonly getTopContributorMessage: (address: AddressString | Promise<AddressString>) => Promise<string>;
  readonly onRevokeSendTransfer: (
    from: AddressString | Promise<AddressString>,
    amount: BigNumber | Promise<BigNumber>,
    asset: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly owner: () => Promise<AddressString>;
  readonly setupContributions: (
    address: AddressString | Promise<AddressString>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<undefined, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly updateContributorMessage: (
    source: AddressString | Promise<AddressString>,
    contributor: AddressString | Promise<AddressString>,
    message: string | Promise<string>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
  readonly updateMessage: (
    address: AddressString | Promise<AddressString>,
    message: string | Promise<string>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, SmartDonationEvent> & { readonly transaction: InvocationTransaction }>;
}
