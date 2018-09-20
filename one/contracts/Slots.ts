import { Address, Blockchain, constant, crypto, Deploy, SmartContract, Integer, Fixed } from '@neo-one/smart-contract';

export class Slots extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'davemneo',
    email: 'dave.mathiesen@neotracker.io',
    description: 'NEO•ONE Slots',
  };

  private mutableSeed = 0;

  public constructor(public readonly owner: Address = Deploy.senderAddress) {
    super();
    if (!Address.isCaller(owner)) {
      throw new Error('Sender was not the owner.');
    }

    const seed = crypto.hash256(Blockchain.currentTransaction.hash).toInteger();
    this.mutableSeed = seed < 0 ? -seed : seed;
  }

  @constant
  public spin(wager: Integer, spinCount: Integer, address: Address): ReadonlyArray<Integer> {
    if (!this.mutableSeed) {
      return [];
    }
    let spins: Array<Fixed<8>> = [];
    for (let i = 1; i < 100 ** spinCount; i *= 100) {
      spins.push((this.mutableSeed / i) % 100);
    }

    const winningSpin = 1;
    let winState = spins.reduce((final, cur) => (final === -1 && cur === winningSpin ? -1 : -2), -1);

    if (winState) {
      // transfer to user
    } else {
      // transfer to SC address
    }
    winState = -1;
    let amount = 1;
    // transfer funds to escrow

    // transfer funds to account

    return [winState, amount, ...spins];
  }
}
