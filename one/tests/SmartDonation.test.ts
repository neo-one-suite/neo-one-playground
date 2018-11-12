import { Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

describe('SmartDonation Tests', () => {
  test('SmartDonation Contract Test', async () => {
    await withContracts(async ({ networkName, one, developerClient, smartDonation, masterAccountID, accountIDs }) => {
      // setup our test account to have some ONE, also create a second wallet for testing
      await developerClient.fastForwardOffset(60 * 60);
      const testMessage = 'take my money.';

      const receiveAccount = accountIDs[0];

      const masterAddress = masterAccountID.address;
      const receiveAddress = receiveAccount.address;
      const contractAddress = smartDonation.definition.networks[networkName].address;

      const mintResult = await one.mintTokens({
        sendTo: [
          {
            amount: new BigNumber('10'),
            asset: Hash256.NEO,
          },
        ],
      });
      const mintReceipt = await mintResult.confirmed();
      if (mintReceipt.result.state === 'FAULT') {
        throw new Error(mintReceipt.result.message);
      }

      // setup an account to receive contributions
      await smartDonation.setupContributions.confirmed(receiveAddress);

      const donateAmount = new BigNumber('100');

      // use our master account to contribute to our receive account
      const contributeReceipt = await one.transfer.confirmed(
        masterAddress,
        contractAddress,
        donateAmount,
        ...smartDonation.forwardApproveReceiveTransferArgs(receiveAddress, testMessage),
      );
      if (contributeReceipt.result.state === 'FAULT') {
        throw new Error(contributeReceipt.result.state);
      }

      // check that our receive address got the funds, also check our constant functions

      const [contributionInfo, donationInfo] = await Promise.all([
        smartDonation.getContributionInfo(receiveAddress, masterAddress),
        smartDonation.getDonationInfo(receiveAddress),
      ]);

      expect(donationInfo.message).toEqual('');
      expect(donationInfo.balance.toString()).toEqual('100');
      expect(contributionInfo.message).toEqual('take my money.');
      expect(donationInfo.topContributor).toEqual(masterAddress);
      expect(contributionInfo.amount).toEqual(donateAmount);
      expect(donationInfo.currentBalance).toEqual(contributionInfo.amount);

      // now we will collect the funds on the receive account and check balances again
      const collectReceipt = await smartDonation.collect.confirmed(receiveAddress, {
        from: receiveAccount,
      });
      if (collectReceipt.result.state === 'FAULT') {
        throw new Error(collectReceipt.result.state);
      }

      expect(collectReceipt.result.value).toEqual(true);

      const { balance: newBalance, currentBalance: newCurrentBalance } = await smartDonation.getDonationInfo(
        receiveAddress,
      );

      expect(newBalance).toEqual(donateAmount);
      expect(newCurrentBalance.toString()).toEqual('0');
    });
  });
});
