import {
  Address,
  constant,
  Deploy,
  Fixed,
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

  public constructor(public readonly owner: Address = Deploy.senderAddress) {
    super();
    if (!Address.isCaller(owner)) {
      throw new Error('Sender was not the owner.');
    }
  }

  // Meta Donation Info Getters
  @constant
  public getMessage(address: Address): string {
    const info = this.storage.get([address, address]);

    return info === undefined ? 'this address has not been set up for donations.' : info[1];
  }

  @constant
  public getBalance(address: Address): Fixed<8> {
    const info = this.storage.get([address, address]);

    return info === undefined ? 0 : info[0];
  }

  @constant
  public getCurrentBalance(address: Address): Fixed<8> {
    const info = this.storage.get([address, this.address]);

    return info === undefined ? 0 : info[0];
  }

  // Donation Contributor Getters
  @constant
  public getContributorMessage(source: Address, contributor: Address): string {
    const info = this.storage.get([source, contributor]);

    return info === undefined ? '' : info[1];
  }

  @constant
  public getContributorAmount(source: Address, contributor: Address): Fixed<8> {
    const info = this.storage.get([source, contributor]);

    return info === undefined ? 0 : info[0];
  }

  // One interface functions
  public approveReceiveTransfer(_from: Address, _amount: Fixed<0>, _asset: Address) {
    return false;
  }

  public onRevokeSendTransfer(_from: Address, _amount: Fixed<0>, _asset: Address) {
    return false;
  }

  // add your address to allow contributions to be tracked (global donation message optional)
  public setupContributions(address: Address, message?: string): void {
    const info = this.storage.get([address, address]);
    if (info !== undefined) {
      throw new Error(`This address is already setup to track contributions.`);
    }

    this.storage.set([address, address], [0, message === undefined ? '' : message]);
    this.storage.set([address, this.address], [0, '']);
  }

  public contribute(from: Address, to: Address, amount: Fixed<8>, messageIn?: string): boolean {
    const balance = this.storage.get([to, to]);
    const current = this.storage.get([to, this.address]);

    if (balance === undefined || current === undefined) {
      throw new Error(`That address hasn't been setup to receive contributions yet.`);
    }

    if (one.transfer(from, this.address, amount)) {
      const contributor = this.storage.get([to, from]);
      const message = messageIn === undefined ? (contributor === undefined ? '' : contributor[1]) : messageIn;
      const contribBalance = contributor === undefined ? amount : contributor[0] + amount;

      this.storage.set([to, to], [balance[0] + amount, balance[1]]);
      this.storage.set([to, this.address], [current[0] + amount, '']);
      this.storage.set([to, from], [contribBalance, message]);

      return true;
    }

    return false;
  }

  public collect(address: Address): boolean {
    const account = this.storage.get([address, this.address]);
    if (Address.isCaller(address) && account !== undefined) {
      const confirmation = one.transfer(this.address, address, account[0]);
      if (confirmation) {
        this.storage.set([address, this.address], [0, '']);
      }

      return confirmation;
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
}
