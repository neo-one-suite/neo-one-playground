import { Account, Address, Hash256, SmartContract } from '@neo-one/smart-contract';

export class GASVac extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'danwbyrne',
    email: 'daniel.byrne@neotracker.io',
    description: 'GAS Vacuum',
  };

  public vacuum(address: Address): void {
    this.assertBalance(address);
    this.spendGas();
  }

  private assertBalance(address: Address): void {
    if ((Account.for(address).getBalance(Hash256.GAS) / 10**8) < 1) {
      throw new Error('nothing to vacuum')
    }
  }

  private spendGas(): void {
    let i = 0;
    // tslint:disable
    while (i < 110) {
      console.log('hmmm');
      i++;
    }
    // tslint:enable
  }
}
