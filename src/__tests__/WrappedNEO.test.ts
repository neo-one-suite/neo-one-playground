import { createPrivateKey, Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../neo-one/test';

jest.setTimeout(30000);

describe('WrappedNEO', () => {
  test('wrap + transfer + unwrap', async () => {
    await withContracts(async ({ client, wrappedNeo, masterAccountID, networkName }) => {
      const toWallet = await client.providers.memory.keystore.addUserAccount({
        network: networkName,
        privateKey: createPrivateKey(),
      });

      const [name, symbol, decimals, initialTotalSupply, initialBalance] = await Promise.all([
        wrappedNeo.name(),
        wrappedNeo.symbol(),
        wrappedNeo.decimals(),
        wrappedNeo.totalSupply(),
        wrappedNeo.balanceOf(toWallet.userAccount.id.address),
      ]);
      expect(name).toEqual('Wrapped NEO');
      expect(symbol).toEqual('WNEO');
      expect(decimals.toString()).toEqual('0');
      expect(initialTotalSupply.toString()).toEqual('0');
      expect(initialBalance.toString()).toEqual('0');

      const wrapResult = await wrappedNeo.wrapNEO({
        sendTo: [
          {
            amount: new BigNumber(25),
            asset: Hash256.NEO,
          },
        ],
      });
      const wrapReceipt = await wrapResult.confirmed();
      if (wrapReceipt.result.state === 'FAULT') {
        throw new Error(wrapReceipt.result.message);
      }

      expect(wrapReceipt.result.state).toEqual('HALT');
      expect(wrapReceipt.result.value).toEqual(true);
      expect(wrapReceipt.events).toHaveLength(1);
      const event = wrapReceipt.events[0];
      expect(event.name).toEqual('transfer');
      if (event.name !== 'transfer') {
        throw new Error('For TS');
      }
      expect(event.parameters.from).toBeUndefined();
      expect(event.parameters.to).toEqual(masterAccountID.address);
      expect(event.parameters.amount.toString()).toEqual('25');

      const [totalSupply, balance, toBalance] = await Promise.all([
        wrappedNeo.totalSupply(),
        wrappedNeo.balanceOf(masterAccountID.address),
        wrappedNeo.balanceOf(toWallet.userAccount.id.address),
      ]);
      expect(totalSupply.toString()).toEqual('25');
      expect(balance.toString()).toEqual('25');
      expect(toBalance.toString()).toEqual('0');

      const transferResult = await wrappedNeo.transfer(
        masterAccountID.address,
        toWallet.userAccount.id.address,
        new BigNumber('5'),
      );
      const transferReceipt = await transferResult.confirmed();
      if (transferReceipt.result.state === 'FAULT') {
        throw new Error(transferReceipt.result.message);
      }

      const [transferTotalSupply, transferBalance, transferToBalance] = await Promise.all([
        wrappedNeo.totalSupply(),
        wrappedNeo.balanceOf(masterAccountID.address),
        wrappedNeo.balanceOf(toWallet.userAccount.id.address),
      ]);
      expect(transferTotalSupply.toString()).toEqual('25');
      expect(transferBalance.toString()).toEqual('20');
      expect(transferToBalance.toString()).toEqual('5');

      const unwrapReceipt0 = await wrappedNeo.unwrapNEO.confirmed({
        asset: Hash256.NEO,
        amount: new BigNumber(5),
        to: masterAccountID.address,
      });

      if (unwrapReceipt0.result.state === 'FAULT') {
        throw new Error(unwrapReceipt0.result.message);
      }
      expect(unwrapReceipt0.result.state).toEqual('HALT');
      expect(unwrapReceipt0.result.value).toEqual(true);
      expect(unwrapReceipt0.events).toHaveLength(1);
      const unwrapEvent0 = unwrapReceipt0.events[0];
      expect(unwrapEvent0.name).toEqual('transfer');
      if (unwrapEvent0.name !== 'transfer') {
        throw new Error('For TS');
      }
      expect(unwrapEvent0.parameters.from).toEqual(masterAccountID.address);
      expect(unwrapEvent0.parameters.to).toBeUndefined();
      expect(unwrapEvent0.parameters.amount.toString()).toEqual('5');

      const [unwrap0TotalSupply, unwrap0Balance, unwrap0ToBalance] = await Promise.all([
        wrappedNeo.totalSupply(),
        wrappedNeo.balanceOf(masterAccountID.address),
        wrappedNeo.balanceOf(toWallet.userAccount.id.address),
      ]);
      expect(unwrap0TotalSupply.toString()).toEqual('20');
      expect(unwrap0Balance.toString()).toEqual('15');
      expect(unwrap0ToBalance.toString()).toEqual('5');

      const unwrapResult1 = await wrappedNeo.unwrapNEO(
        {
          asset: Hash256.NEO,
          amount: new BigNumber(2),
          to: toWallet.userAccount.id.address,
        },
        { from: toWallet.userAccount.id },
      );
      const unwrapReceipt1 = await unwrapResult1.confirmed();

      if (unwrapReceipt1.result.state === 'FAULT') {
        throw new Error(unwrapReceipt1.result.message);
      }

      expect(unwrapReceipt1.result.state).toEqual('HALT');
      expect(unwrapReceipt1.result.value).toEqual(true);
      expect(unwrapReceipt1.events).toHaveLength(1);
      const unwrapEvent1 = unwrapReceipt1.events[0];
      expect(unwrapEvent1.name).toEqual('transfer');
      if (unwrapEvent1.name !== 'transfer') {
        throw new Error('For TS');
      }
      expect(unwrapEvent1.parameters.from).toEqual(toWallet.userAccount.id.address);
      expect(unwrapEvent1.parameters.to).toBeUndefined();
      expect(unwrapEvent1.parameters.amount.toString()).toEqual('2');

      const [unwrap1TotalSupply, unwrap1Balance, unwrap1ToBalance] = await Promise.all([
        wrappedNeo.totalSupply(),
        wrappedNeo.balanceOf(masterAccountID.address),
        wrappedNeo.balanceOf(toWallet.userAccount.id.address),
      ]);
      expect(unwrap1TotalSupply.toString()).toEqual('18');
      expect(unwrap1Balance.toString()).toEqual('15');
      expect(unwrap1ToBalance.toString()).toEqual('3');
    });
  });
});
