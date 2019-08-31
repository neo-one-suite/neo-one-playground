import { withContracts } from '../neo-one/test';

jest.setTimeout(30000);

describe('FeatureTest', () => {
  test('features', async () => {
    await withContracts(async ({ featureTest }) => {
      await expect(featureTest.stackTrace()).rejects.toThrowError();
      await expect(featureTest.consoleLog().then((receipt) => receipt)).resolves.toBeDefined();
      await expect(featureTest.typeError()).rejects.toThrowError();
    });
  });
});
