import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('Slots Test', () => {
  test('Spin for Random Numbers', async () =>
    withContracts(async ({ slots }) => {
      const spins = await slots.spin();
      expect(spins.length).toBeGreaterThan(3);
      console.log(spins.join(' | '));
    }));
});
