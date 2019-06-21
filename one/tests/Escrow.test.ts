import { createPrivateKey, Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('Escrow', () => {
  test('transfer to Escrow', async () => {
    await withContracts(async ({ client, developerClient, escrow, one, masterAccountID, networkName }) => {
      await developerClient.fastForwardOffset(60 * 60);

      const toWallet = await client.providers.memory.keystore.addUserAccount({
        network: networkName,
        privateKey: createPrivateKey(),
      });

      const masterAddress = masterAccountID.address;
      const toAddress = toWallet.userAccount.id.address;
      const contractAddress = escrow.definition.networks[networkName].address;
      let balance: BigNumber;

      const mintResult = await one.mintTokens({
        sendTo: [
          {
            amount: new BigNumber(10),
            asset: Hash256.NEO,
          },
        ],
      });
      const mintReceipt = await mintResult.confirmed();
      if (mintReceipt.result.state === 'FAULT') {
        throw new Error(mintReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('0');

      // Send 100 ONE to the contract and confirm the balance is updated correctly
      const sendReceipt = await one.transfer.confirmed(
        masterAddress,
        contractAddress,
        new BigNumber('100'),
        ...escrow.forwardApproveReceiveTransferArgs(toAddress),
      );
      if (sendReceipt.result.state === 'FAULT') {
        throw new Error(sendReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('100');

      // Withdraw 15 ONE from the contract to the sender and confirm the balance is updated correctly
      const revokeReceipt = await escrow.revokeONE.confirmed(masterAddress, toAddress, new BigNumber('15'), {
        from: masterAccountID,
      });
      if (revokeReceipt.result.state === 'FAULT') {
        throw new Error(revokeReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('85');

      // Withdraw 25 ONE from the contract to the sender and confirm the balance is updated correctly
      const receiveReceipt = await escrow.receiveONE.confirmed(masterAddress, toAddress, new BigNumber('25'), {
        from: toWallet.userAccount.id,
      });
      if (receiveReceipt.result.state === 'FAULT') {
        throw new Error(receiveReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('60');

      // Attempt to revoke more ONE from the contract than is available
      await expect(
        escrow.revokeONE.confirmed(masterAddress, toAddress, new BigNumber('100'), {
          from: masterAccountID,
        }),
      ).rejects.toThrow();

      // Attempt to receive more ONE from the contract than is available
      await expect(
        escrow.receiveONE.confirmed(masterAddress, toAddress, new BigNumber('100'), {
          from: toWallet.userAccount.id,
        }),
      ).rejects.toThrow();

      // Receive remaining ONE available
      const receiveRemainingReceipt = await escrow.receiveONE.confirmed(masterAddress, toAddress, undefined, {
        from: toWallet.userAccount.id,
      });
      if (receiveRemainingReceipt.result.state === 'FAULT') {
        throw new Error(receiveRemainingReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('0');

      // Add 10 more GAS to the contract
      const addReceipt = await one.transfer.confirmed(
        masterAddress,
        contractAddress,
        new BigNumber('10'),
        ...escrow.forwardApproveReceiveTransferArgs(toAddress),
      );
      if (addReceipt.result.state === 'FAULT') {
        throw new Error(addReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('10');

      // Revoke remaining ONE available
      const revokeRemainingReceipt = await escrow.revokeONE.confirmed(masterAddress, toAddress, undefined, {
        from: masterAccountID,
      });
      if (revokeRemainingReceipt.result.state === 'FAULT') {
        throw new Error(revokeRemainingReceipt.result.message);
      }

      balance = await escrow.balanceOf(masterAddress, toAddress);
      expect(balance.toString()).toEqual('0');
    });
  });
});
