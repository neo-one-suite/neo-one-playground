import {
  Address,
  constant,
  Fixed,
  ForwardedValue,
  LinkedSmartContract,
  MapStorage,
  SmartContract,
} from '@neo-one/smart-contract';
import { One } from './One';

const one = LinkedSmartContract.for<One>();

export class Escrow extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'afragapane',
    email: 'alex.fragapane@neotracker.io',
    description: 'NEO•ONE Escrow for ONE tokens',
  };
  private readonly balances = MapStorage.for<[Address, Address], Fixed<8>>();

  @constant
  public balanceOf(from: Address, to: Address): Fixed<8> {
    const balance = this.balances.get([from, to]);

    return balance === undefined ? 0 : balance;
  }

  public approveReceiveTransfer(from: Address, amount: Fixed<8>, asset: Address, to: ForwardedValue<Address>): boolean {
    if (!Address.isCaller(asset)) {
      return false;
    }

    this.balances.set([from, to], this.balanceOf(from, to) + amount);

    return true;
  }

  public onRevokeSendTransfer(_from: Address, _amount: Fixed<0>, _asset: Address) {
    // do nothing
  }

  public revokeONE(from: Address, to: Address, amount: Fixed<8> | undefined): boolean {
    if (!Address.isCaller(from)) {
      return false;
    }

    const [revokeAmount, balance] = this.setupReceiveRevoke(from, to, amount);
    if (revokeAmount === undefined || balance === undefined) {
      return false;
    }

    const success = one.transfer(this.address, from, revokeAmount);
    if (success) {
      this.balances.set([from, to], balance - revokeAmount);

      return true;
    }

    return false;
  }

  public receiveONE(from: Address, to: Address, amount: Fixed<8> | undefined): boolean {
    if (!Address.isCaller(to)) {
      return false;
    }

    const [receiveAmount, balance] = this.setupReceiveRevoke(from, to, amount);
    if (receiveAmount === undefined || balance === undefined) {
      return false;
    }

    const success = one.transfer(this.address, to, receiveAmount);
    if (success) {
      this.balances.set([from, to], balance - receiveAmount);

      return true;
    }

    return false;
  }

  private setupReceiveRevoke(
    from: Address,
    to: Address,
    amount: Fixed<8> | undefined,
  ): [Fixed<8> | undefined, Fixed<8> | undefined] {
    const balance = this.balanceOf(from, to);
    let receiveRevokeAmount: Fixed<8>;
    if (amount === undefined) {
      receiveRevokeAmount = balance;
    } else {
      if (balance < amount) {
        return [undefined, undefined];
      }
      receiveRevokeAmount = amount;
    }

    return [receiveRevokeAmount, balance];
  }
}
