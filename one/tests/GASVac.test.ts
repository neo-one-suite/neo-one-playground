import { createPrivateKey, Hash256, privateKeyToAddress } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('GASVac', () => {
  test('eats one gas from our account', async () => {
    await withContracts(async ({ gasVac, masterAccountID }) => {
      const test = await gasVac.vacuum(masterAccountID.address);
      const receipt = await test.confirmed({timeoutMS: 2500});
      if (receipt.result.state === 'FAULT') {
        throw new Error(receipt.result.message);
      }

      expect(receipt.result.gasConsumed.gt(new BigNumber(0))).toBeTruthy();
      expect(receipt.result.gasCost.gt(new BigNumber(10))).toBeTruthy();
    })
  })

  test('throws when no gas to eat', async () => {
    await withContracts(async ({ client, gasVac }) => {
      const testKey = createPrivateKey();
      const result = await client.transfer(new BigNumber(1), Hash256.NEO, privateKeyToAddress(testKey));
      await result.confirmed();
      const test = gasVac.vacuum(privateKeyToAddress(testKey));
      await expect(test).rejects.toThrowError();
    })
  })

  test('throws when not at least 1 gas to eat', async () => {
    await withContracts(async ({ client, gasVac }) => {
      const testKey = createPrivateKey();
      const result = await client.transfer(new BigNumber(.8), Hash256.GAS, privateKeyToAddress(testKey));
      await result.confirmed();
      const test = gasVac.vacuum(privateKeyToAddress(testKey));
      await expect(test).rejects.toThrowError();
    })
  })
})
