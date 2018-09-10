import { Address, Blockchain, constant, crypto, Deploy, SmartContract, Hash256 } from '@neo-one/smart-contract';

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
  public contractInfo() {
    // const myHash = Blockchain.currentTransaction.hash.toString('utf8');
    const myHash = Blockchain.currentTransaction.hash.toString('utf8');
    const items = [
      {
        name: 'txHash',
        value: myHash,
      },
      {
        name: 'hashHeight',
        value: Blockchain.currentHeight,
      },
      {
        name: 'timeStamp',
        value: Blockchain.currentBlockTime,
      },
      {
        name: "this contract's address",
        value: this.address,
      },
    ];
    console.log(items.map((item) => `${item.name} = ${item.value}`).join('\n'));
  }

  @constant
  public spin(wager: '1' | '2' | '5', Address: Hash256): ReadonlyArray<number> {
    if (!this.mutableSeed) {
      return [];
    }

    const spin1 = this.mutableSeed % 100;
    const spin2 = (this.mutableSeed / 100) % 100;
    const spin3 = (this.mutableSeed / 10000) % 100;
    const spin4 = (this.mutableSeed / 1000000) % 100;
    const spin5 = (this.mutableSeed / 100000000) % 100;
    const spin6 = (this.mutableSeed / 10000000000) % 100;

    return [spin1, spin2, spin3, spin4, spin5, spin6];
  }
}
