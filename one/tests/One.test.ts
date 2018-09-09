import { createPrivateKey, Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('One', () => {
  test('mintTokens + transfer', async () => {
    await withContracts(async ({ client, developerClient, one, masterAccountID, networkName }) => {
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
        one.name(),
        one.symbol(),
        one.decimals(),
        one.amountPerNEO(),
        one.owner(),
        one.icoDurationSeconds(),
        one.totalSupply(),
        one.remaining(),
        one.balanceOf(toWallet.account.id.address),
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

      const mintReceipt = await one.mintTokens.confirmed({
        sendTo: [
          {
            amount: new BigNumber(10),
            asset: Hash256.NEO,
          },
        ],
      });
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
        one.totalSupply(),
        one.remaining(),
        one.balanceOf(masterAccountID.address),
        one.balanceOf(toWallet.account.id.address),
      ]);
      expect(totalSupply.toString()).toEqual('1000000');
      expect(remaining.toString()).toEqual(new BigNumber(9_999_000_000).toString());
      expect(balance.toString()).toEqual('1000000');
      expect(toBalance.toString()).toEqual('0');

      const receipt = await one.transfer.confirmed(
        masterAccountID.address,
        toWallet.account.id.address,
        new BigNumber('25'),
      );
      if (receipt.result.state === 'FAULT') {
        throw new Error(receipt.result.message);
      }

      const [totalSupplyAfter, balanceAfter, toBalanceAfter] = await Promise.all([
        one.totalSupply(),
        one.balanceOf(masterAccountID.address),
        one.balanceOf(toWallet.account.id.address),
      ]);
      expect(totalSupplyAfter.toString()).toEqual('1000000');
      expect(balanceAfter.toString()).toEqual('999975');
      expect(toBalanceAfter.toString()).toEqual('25');
    });
  });
});
