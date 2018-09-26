import {
  Address,
  constant,
  Deploy,
  Fixed,
  ForwardedValue,
  LinkedSmartContract,
  MapStorage,
  SmartContract,
} from '@neo-one/smart-contract';
import { One } from './One';

const one = LinkedSmartContract.for<One>();

export class SmartDonation extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'danwbyrne',
    email: 'daniel.byrne@neotracker.io',
    description: 'Donation Hub Smart Contract',
  };

  private readonly storage = MapStorage.for<[Address /*receiver*/, Address /*contributor*/], [Fixed<8>, string]>();
  private readonly balances = MapStorage.for<Address /*receiver*/, [string, Fixed<8>, Fixed<8>, Address]>();

  public constructor(public readonly owner: Address = Deploy.senderAddress) {
    super();
    if (!Address.isCaller(owner)) {
      throw new Error('Sender was not the owner.');
    }
  }

  // Meta Donation Info Getters
  @constant
  public getMessage(address: Address): string {
    const info = this.balances.get(address);

    return info === undefined ? 'Address not set up.' : info[0];
  }

  @constant
  public getBalance(address: Address): Fixed<8> {
    const info = this.balances.get(address);

    return info === undefined ? -1 : info[1];
  }

  @constant
  public getCurrentBalance(address: Address): Fixed<8> {
    const info = this.balances.get(address);

    return info === undefined ? -1 : info[2];
  }

  @constant
  public getTopContributor(address: Address): Address {
    const info = this.balances.get(address);

    return info === undefined ? this.address : info[3];
  }

  @constant
  public getTopContributorMessage(address: Address): string {
    const topContrib = this.getTopContributor(address);

    return this.getContributorMessage(address, topContrib);
  }

  // Donation Contributor Getters
  @constant
  public getContributorAmount(source: Address, contributor: Address): Fixed<8> {
    const info = this.storage.get([source, contributor]);

    return info === undefined ? -1 : info[0];
  }

  @constant
  public getContributorMessage(source: Address, contributor: Address): string {
    const info = this.storage.get([source, contributor]);

    return info === undefined ? '' : info[1];
  }

  // One interface functions
  public approveReceiveTransfer(
    from: Address,
    amount: Fixed<8>,
    asset: Address,
    to: ForwardedValue<Address>,
    message: ForwardedValue<string>,
  ): boolean {
    if (!Address.isCaller(asset)) {
      return false;
    }

    return this.contribute(from, to, amount, message);
  }

  public onRevokeSendTransfer(_from: Address, _amount: Fixed<0>, _asset: Address) {
    // do nothing
  }

  // add your address to allow contributions to be tracked (global donation message optional)
  public setupContributions(address: Address): void {
    const info = this.balances.get(address);
    if (info !== undefined) {
      throw new Error(`This address is already setup to track contributions.`);
    }

    this.balances.set(address, ['', 0, 0, this.address]);
    this.storage.set([address, this.address], [0, '']);
  }

  public collect(address: Address): boolean {
    const account = this.balances.get(address);
    if (Address.isCaller(address) && account !== undefined) {
      const confirmation = one.transfer(this.address, address, account[2]);
      if (confirmation) {
        this.balances.set(address, ['', account[1], 0, account[3]]);
      }

      return confirmation;
    }

    return false;
  }

  public updateMessage(address: Address, message: string): boolean {
    const account = this.balances.get(address);
    if (account !== undefined && Address.isCaller(address)) {
      this.balances.set(address, [message, account[1], account[2], account[3]]);

      return true;
    }

    return false;
  }

  public updateContributorMessage(source: Address, contributor: Address, message: string): boolean {
    const account = this.storage.get([source, contributor]);
    if (account !== undefined && Address.isCaller(source)) {
      this.storage.set([source, contributor], [account[0], message]);

      return true;
    }

    return false;
  }

  private contribute(from: Address, to: Address, amount: Fixed<8>, messageIn?: string): boolean {
    const balances = this.balances.get(to);

    if (balances === undefined) {
      throw new Error(`That address hasn't been setup to receive contributions yet.`);
    }

    const contributor = this.storage.get([to, from]);
    const message = messageIn === undefined ? (contributor === undefined ? '' : contributor[1]) : messageIn;
    const contribBalance = contributor === undefined ? amount : contributor[0] + amount;

    // this value is actually definitely defined for real I'm not kidding no bamboozlerino
    const currentTop = (this.storage.get([to, balances[3]]) as [Fixed<8>, string])[0];
    const topContributor = contribBalance > currentTop ? from : balances[3];

    this.balances.set(to, [balances[0], balances[1] + amount, balances[2] + amount, topContributor]);
    this.storage.set([to, from], [contribBalance, message]);

    return true;
  }
}
