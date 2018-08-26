import { createPrivateKey, Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('ICO', () => {
  test('mintTokens + transfer', async () => {
    await withContracts(async ({ client, developerClient, ico, masterAccountID, networkName }) => {
      await developerClient.fastForwardOffset(60 * 60);

      const toWallet = await client.providers.memory.keystore.addAccount({
        network: networkName,
        privateKey: createPrivateKey(),
      });

      const [
        name,
        symbol,
        decimals,
        amountPerNEO,
        owner,
        icoDurationSeconds,
        initialTotalSupply,
        initialRemaining,
        initialBalance,
      ] = await Promise.all([
        ico.name(),
        ico.symbol(),
        ico.decimals(),
        ico.amountPerNEO(),
        ico.owner(),
        ico.icoDurationSeconds(),
        ico.totalSupply(),
        ico.remaining(),
        ico.balanceOf(toWallet.account.id.address),
      ]);
      expect(name).toEqual('One');
      expect(symbol).toEqual('ONE');
      expect(decimals.toString()).toEqual('8');
      expect(amountPerNEO.toString()).toEqual('100000');
      expect(owner).toEqual(masterAccountID.address);
      expect(icoDurationSeconds.toString()).toEqual('86400');
      expect(initialTotalSupply.toString()).toEqual('0');
      expect(initialRemaining.toString()).toEqual(new BigNumber(10_000_000_000).toString());
      expect(initialBalance.toString()).toEqual('0');

      const mintResult = await ico.mintTokens({
        transfers: [
          {
            to: ico.definition.networks[networkName].address,
            amount: new BigNumber(10),
            asset: Hash256.NEO,
          },
        ],
      });
      const mintReceipt = await mintResult.confirmed();
      if (mintReceipt.result.state === 'FAULT') {
        throw new Error(mintReceipt.result.message);
      }

      expect(mintReceipt.result.state).toEqual('HALT');
      expect(mintReceipt.result.value).toEqual(true);
      expect(mintReceipt.events).toHaveLength(1);
      const event = mintReceipt.events[0];
      expect(event.name).toEqual('transfer');
      if (event.name !== 'transfer') {
        throw new Error('For TS');
      }
      expect(event.parameters.from).toBeUndefined();
      expect(event.parameters.to).toEqual(masterAccountID.address);
      expect(event.parameters.amount.toString()).toEqual('1000000');

      const [totalSupply, remaining, balance, toBalance] = await Promise.all([
        ico.totalSupply(),
        ico.remaining(),
        ico.balanceOf(masterAccountID.address),
        ico.balanceOf(toWallet.account.id.address),
      ]);
      expect(totalSupply.toString()).toEqual('1000000');
      expect(remaining.toString()).toEqual(new BigNumber(9_999_000_000).toString());
      expect(balance.toString()).toEqual('1000000');
      expect(toBalance.toString()).toEqual('0');

      const result = await ico.transfer(masterAccountID.address, toWallet.account.id.address, new BigNumber('25'));
      const receipt = await result.confirmed({ timeoutMS: 2500 });
      if (receipt.result.state === 'FAULT') {
        throw new Error(receipt.result.message);
      }

      const [totalSupplyAfter, balanceAfter, toBalanceAfter] = await Promise.all([
        ico.totalSupply(),
        ico.balanceOf(masterAccountID.address),
        ico.balanceOf(toWallet.account.id.address),
      ]);
      expect(totalSupplyAfter.toString()).toEqual('1000000');
      expect(balanceAfter.toString()).toEqual('999975');
      expect(toBalanceAfter.toString()).toEqual('25');
    });
  });
});
