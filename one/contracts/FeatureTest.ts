// tslint:disable no-console no-null-keyword
import { Address, Deploy, SmartContract } from '@neo-one/smart-contract';

export class FeatureTest extends SmartContract {
  public readonly properties = {
    codeVersion: '1.0',
    author: 'dicarlo2',
    email: 'alex.dicarlo@neotracker.io',
    description: 'NEO•ONE Feature Test',
  };

  public constructor(public readonly owner: Address = Deploy.senderAddress) {
    super();
    if (!Address.isCaller(owner)) {
      throw new Error(`Sender was not the owner. Received: ${owner}`);
    }
  }

  public stackTrace(): void {
    this.heres();
  }

  public consoleLog(): void {
    console.log('Log every type.');
    console.log(null);
    console.log(undefined);
    console.log(true);
    console.log(10);
    console.log([1, 2, 3, 4]);
    console.log(Buffer.from('10ab', 'hex'));
    console.log(
      new Map()
        .set('a', 1)
        .set('b', 2)
        .set('c', 3),
    );
    console.log(new Set([1, 1, 2, 3, 4]));
    console.log({
      evenNestedOnes: [
        {
          reallyNested: [
            {
              whenDoesItEnd: '????',
            },
          ],
        },
      ],
    });

    console.log('Concatenate strings.');
    console.log(`Here's a number: ${5}`);
    console.log(`Here's a boolean: ${true}`);
    console.log(`Here's an array: ${[1, 2, 3]}`);
    console.log(`Here's a buffer: ${Buffer.from('hello', 'utf8')}`);
    console.log(
      `Here's an object that overrides toString: ${{
        toString() {
          return "Look at me I'm an object!";
        },
      }}`,
    );
  }

  public typeError(): void {
    console.log(`${{ x: 3 }}`);
  }

  private heres(): void {
    this.my();
  }

  private my(): void {
    this.number();
  }

  private number(): void {
    const so = () => {
      function call() {
        const me = () => {
          function maybe() {
            throw new Error('Bar');
          }

          maybe();
        };

        me();
      }

      call();
    };

    so();
  }
}
