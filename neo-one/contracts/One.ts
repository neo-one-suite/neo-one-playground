import {
  Address,
  Blockchain,
  constant,
  Contract,
  createEventNotifier,
  Deploy,
  Fixed,
  ForwardValue,
  Hash256,
  Integer,
  MapStorage,
  receive,
  SmartContract,
} from '@neo-one/smart-contract';

const notifyTransfer = createEventNotifier<Address | undefined, Address | undefined, Fixed<8>>(
  'transfer',
  'from',
  'to',
  'amount',
);
const notifyApproveSendTransfer = createEventNotifier<Address, Address, Fixed<8>>(
  'approveSendTransfer',
  'from',
  'to',
  'amount',
);
const notifyRevokeSendTransfer = createEventNotifier<Address, Address, Fixed<8>>(
  'revokeSendTransfer',
  'from',
  'to',
  'amount',
);

interface TokenPayableContract {
  readonly approveReceiveTransfer: (
    from: Address,
    amount: Fixed<8>,
    asset: Address,
    // tslint:disable-next-line readonly-array
    ...args: ForwardValue[]
  ) => boolean;
  readonly onRevokeSendTransfer: (from: Address, amount: Fixed<8>, asset: Address) => void;
}

export class One extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'dicarlo2',
    email: 'alex.dicarlo@neotracker.io',
    description: 'NEO•ONE ICO',
  };
  public readonly name = 'One';
  public readonly symbol = 'ONE';
  public readonly decimals = 8;
  public readonly amountPerNEO = 100_000;
  private readonly balances = MapStorage.for<Address, Fixed<8>>();
  private readonly approvedTransfers = MapStorage.for<[Address, Address], Fixed<8>>();
  private mutableRemaining: Fixed<8> = 10_000_000_000_00000000;
  private mutableSupply: Fixed<8> = 0;

  public constructor(
    public readonly owner: Address = Deploy.senderAddress,
    public readonly icoStartTimeSeconds: Integer = Blockchain.currentBlockTime + 60 * 60,
    public readonly icoDurationSeconds: Integer = 86400,
  ) {
    super();
    if (!Address.isCaller(owner)) {
      throw new Error(`Sender was not the owner. Received: ${owner}`);
    }
  }

  @constant
  public get totalSupply(): Fixed<8> {
    return this.mutableSupply;
  }

  @constant
  public balanceOf(address: Address): Fixed<8> {
    const balance = this.balances.get(address);

    return balance === undefined ? 0 : balance;
  }

  @constant
  public approvedTransfer(from: Address, to: Address): Fixed<8> {
    const approved = this.approvedTransfers.get([from, to]);

    return approved === undefined ? 0 : approved;
  }

  // tslint:disable-next-line readonly-array
  public transfer(from: Address, to: Address, amount: Fixed<8>, ...approveArgs: ForwardValue[]): boolean {
    if (amount < 0) {
      throw new Error(`Amount must be greater than 0: Received: ${amount}`);
    }

    const fromBalance = this.balanceOf(from);
    if (fromBalance < amount) {
      throw new Error('Cannot send amount greater than current address balance');
    }

    const approved = this.approvedTransfer(from, to);
    const reduceApproved = approved >= amount && Address.isCaller(to);
    if (!reduceApproved && !Address.isCaller(from)) {
      throw new Error(`Expected caller to be owner. Received: ${from}`);
    }

    const contract = Contract.for(to);
    if (contract !== undefined && !Address.isCaller(to)) {
      const smartContract = SmartContract.for<TokenPayableContract>(to);
      if (!smartContract.approveReceiveTransfer(from, amount, this.address, ...approveArgs)) {
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

  public approveSendTransfer(from: Address, to: Address, amount: Fixed<8>): boolean {
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

  public approveReceiveTransfer(_from: Address, _amount: Fixed<8>, _asset: Address): boolean {
    return false;
  }

  public revokeSendTransfer(from: Address, to: Address, amount: Fixed<8>): boolean {
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

  public onRevokeSendTransfer(_from: Address, _amount: Fixed<8>, _asset: Address): void {
    // do nothing
  }

  @constant
  public get remaining(): Fixed<8> {
    return this.mutableRemaining;
  }

  @receive
  public mintTokens(): boolean {
    if (!this.hasStarted()) {
      throw new Error(`ICO hasn\'t started yet.`);
    }
    if (this.hasEnded()) {
      throw new Error(`ICO has ended.`);
    }

    const { references } = Blockchain.currentTransaction;
    if (references.length === 0) {
      throw new Error('Blockchain reference failed');
    }
    const sender = references[0].address;

    let amount = 0;
    // tslint:disable-next-line no-loop-statement
    for (const output of Blockchain.currentTransaction.outputs) {
      if (output.address.equals(this.address)) {
        if (!output.asset.equals(Hash256.NEO)) {
          throw new Error('Expecting only NEO to be sent to the contact');
        }

        amount += output.value * this.amountPerNEO;
      }
    }

    if (amount > this.remaining) {
      throw new Error(`Amount is greater than remaining tokens. Amount: ${amount}. Remaining: ${this.remaining}`);
    }

    this.mutableRemaining -= amount;
    this.issue(sender, amount);

    return true;
  }

  private issue(addr: Address, amount: Fixed<8>): void {
    this.balances.set(addr, this.balanceOf(addr) + amount);
    this.mutableSupply += amount;
    notifyTransfer(undefined, addr, amount);
  }

  private hasStarted(): boolean {
    return Blockchain.currentBlockTime >= this.icoStartTimeSeconds;
  }

  private hasEnded(): boolean {
    return Blockchain.currentBlockTime > this.icoStartTimeSeconds + this.icoDurationSeconds;
  }
}
