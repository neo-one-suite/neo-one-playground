import { withContracts } from '../generated/test';
import BigNumber from 'bignumber.js';
jest.setTimeout(30000);

describe('Slots Test', () => {
  test('Spin for Random Numbers', async () =>
    withContracts(async ({ slots }) => {
      const userAccount = 'enwthing';
      const spins = await slots.spin(new BigNumber('1'), new BigNumber('3'), userAccount);
      expect(spins.length).toBeGreaterThan(3);
    }));
});
