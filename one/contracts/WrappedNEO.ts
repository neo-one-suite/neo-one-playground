import {
  Address,
  Blockchain,
  constant,
  Contract,
  createEventNotifier,
  Fixed,
  Hash256,
  MapStorage,
  receive,
  send,
  SmartContract,
  Transfer,
} from '@neo-one/smart-contract';

const notifyTransfer = createEventNotifier<Address | undefined, Address | undefined, Fixed<0>>(
  'transfer',
  'from',
  'to',
  'amount',
);
const notifyApproveSendTransfer = createEventNotifier<Address, Address, Fixed<0>>(
  'approveSendTransfer',
  'from',
  'to',
  'amount',
);
const notifyRevokeSendTransfer = createEventNotifier<Address, Address, Fixed<0>>(
  'revokeSendTransfer',
  'from',
  'to',
  'amount',
);

interface TokenPayableContract {
  readonly approveReceiveTransfer: (from: Address, amount: Fixed<0>, asset: Address) => boolean;
  readonly onRevokeSendTransfer: (from: Address, amount: Fixed<0>, asset: Address) => void;
}

const FACTOR = 10 ** 8;

export class WrappedNEO extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'dicarlo2',
    email: 'alex.dicarlo@neotracker.io',
    description: 'Wrapped NEO',
  };
  public readonly name = 'Wrapped NEO';
  public readonly symbol = 'WNEO';
  public readonly decimals = 0;
  private readonly balances = MapStorage.for<Address, Fixed<0>>();
  private readonly approvedTransfers = MapStorage.for<[Address, Address], Fixed<0>>();
  private mutableSupply: Fixed<0> = 0;

  @constant
  public get totalSupply(): Fixed<0> {
    return this.mutableSupply;
  }

  @constant
  public balanceOf(address: Address): Fixed<0> {
    const balance = this.balances.get(address);

    return balance === undefined ? 0 : balance;
  }

  @constant
  public approvedTransfer(from: Address, to: Address): Fixed<0> {
    const approved = this.approvedTransfers.get([from, to]);

    return approved === undefined ? 0 : approved;
  }

  public transfer(from: Address, to: Address, amount: Fixed<0>): boolean {
    if (amount < 0) {
      throw new Error(`Amount must be greater than 0: ${amount}`);
    }

    const fromBalance = this.balanceOf(from);
    if (fromBalance < amount) {
      throw new Error(
        `Amount cannot be greater than from address balance. Amount: ${amount}. From balance: ${fromBalance}`,
      );
    }

    const approved = this.approvedTransfer(from, to);
    const reduceApproved = approved >= amount;
    if (!reduceApproved && !Address.isCaller(from)) {
      throw new Error(`Expected caller to be owner. Received: ${from}`);
    }

    const contract = Contract.for(to);
    if (contract !== undefined && !Address.isCaller(to)) {
      const smartContract = SmartContract.for<TokenPayableContract>(to);
      if (!smartContract.approveReceiveTransfer(from, amount, this.address)) {
        throw new Error('Transfer receive was not approved');
      }
    }

    const toBalance = this.balanceOf(to);
    this.balances.set(from, fromBalance - amount);
    this.balances.set(to, toBalance + amount);
    notifyTransfer(from, to, amount);

    if (reduceApproved) {
      this.approvedTransfers.set([from, to], approved - amount);
    }

    return true;
  }

  public approveSendTransfer(from: Address, to: Address, amount: Fixed<0>): boolean {
    if (amount < 0) {
      throw new Error(`Amount must be greater than 0: ${amount}`);
    }

    if (!Address.isCaller(from)) {
      throw new Error(`Expected caller to be owner. Received: ${from}`);
    }

    this.approvedTransfers.set([from, to], this.approvedTransfer(from, to) + amount);
    notifyApproveSendTransfer(from, to, amount);

    return true;
  }

  public approveReceiveTransfer(_from: Address, _amount: Fixed<0>, _asset: Address): boolean {
    return false;
  }

  public revokeSendTransfer(from: Address, to: Address, amount: Fixed<0>): boolean {
    if (amount < 0) {
      throw new Error(`Amount must be greater than 0: ${amount}`);
    }

    if (!Address.isCaller(from)) {
      throw new Error(`Expected caller to be owner. Received: ${from}`);
    }

    const approved = this.approvedTransfer(from, to);
    if (approved < amount) {
      throw new Error(`Amount must be greater than the approved amount. Amount: ${amount}. Approved: ${approved}`);
    }

    this.approvedTransfers.set([from, to], approved - amount);
    notifyRevokeSendTransfer(from, to, amount);

    const contract = Contract.for(to);
    if (contract !== undefined) {
      const smartContract = SmartContract.for<TokenPayableContract>(to);
      // NOTE: This should catch errors once we have stack isolation
      smartContract.onRevokeSendTransfer(from, amount, this.address);
    }

    return true;
  }

  public onRevokeSendTransfer(_from: Address, _amount: Fixed<0>, _asset: Address): void {
    // do nothing
  }

  @receive
  public wrapNEO(): boolean {
    const transaction = Blockchain.currentTransaction;
    const { references } = transaction;
    if (references.length === 0) {
      throw new Error('Nothing to refund');
    }

    // We're only going to credit one address, so just pick the first one from the references.
    const sender = references[0].address;
    // We loop over the entire reference list, so users will want to consolidate prior to invoking.
    if (references.some((reference) => reference.asset.equals(Hash256.NEO) && !reference.address.equals(sender))) {
      return false;
    }

    let amount = 0;
    // tslint:disable-next-line no-loop-statement
    for (const output of transaction.outputs) {
      if (output.address.equals(this.address)) {
        // Don't allow transactions that send anything but NEO to the contract.
        if (!output.asset.equals(Hash256.NEO)) {
          throw new Error('Expecting only NEO to be sent to the contact');
        }

        amount += output.value / FACTOR;
      }
    }

    if (amount === 0) {
      throw new Error('No NEO sent to the contract');
    }

    this.balances.set(sender, this.balanceOf(sender) + amount);
    this.mutableSupply += amount;
    notifyTransfer(undefined, sender, amount);

    return true;
  }

  @send
  public unwrapNEO(transfer: Transfer): boolean {
    if (!transfer.asset.equals(Hash256.NEO)) {
      throw new Error('Expected transfer asset to be NEO');
    }
    const amount = transfer.amount / FACTOR;
    const balance = this.balanceOf(transfer.to);

    if (balance < amount) {
      throw new Error(`Transfer amount must be greater than to balance. Amount: ${amount}. Balance: ${balance}`);
    }

    this.balances.set(transfer.to, balance - amount);
    this.mutableSupply -= amount;
    notifyTransfer(transfer.to, undefined, amount);

    return true;
  }
}
