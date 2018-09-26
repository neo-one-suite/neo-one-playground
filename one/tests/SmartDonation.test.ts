import { createPrivateKey, Hash256 } from '@neo-one/client';
import BigNumber from 'bignumber.js';
import { withContracts } from '../generated/test';

jest.setTimeout(30000);

test('SmartDonation - Test', async () => {
  await withContracts(async ({ networkName, one, client, developerClient, smartDonation, masterAccountID }) => {
    // setup our test account to have some ONE, also create a second wallet for testing
    await developerClient.fastForwardOffset(60 * 60);
    const testMessage = 'take my money.';

    const receiveWallet = await client.providers.memory.keystore.addAccount({
      network: networkName,
      privateKey: createPrivateKey(),
    });

    const masterAddress = masterAccountID.address;
    const receiveAddress = receiveWallet.account.id.address;
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
    await smartDonation.setupContributions.confirmed(receiveAddress, { timeoutMS: 2500 });

    // use our master account to contribute to our receive account
    const contributeReceipt = await one.transfer.confirmed(
      masterAddress,
      contractAddress,
      new BigNumber('100'),
      ...smartDonation.forwardApproveReceiveTransferArgs(receiveAddress, testMessage),
    );
    if (contributeReceipt.result.state === 'FAULT') {
      throw new Error(contributeReceipt.result.state);
    }

    // check that our receive address got the funds, also check our constant functions
    const message = await smartDonation.getMessage(receiveAddress);
    const balance = await smartDonation.getBalance(receiveAddress);
    const currBalance = await smartDonation.getCurrentBalance(receiveAddress);
    const contribMessage = await smartDonation.getContributorMessage(receiveAddress, masterAddress);
    const contribAmount = await smartDonation.getContributorAmount(receiveAddress, masterAddress);
    const topContributor = await smartDonation.getTopContributor(receiveAddress);

    expect(message).toEqual('');
    expect(contribMessage).toEqual('take my money.');
    expect(balance.toString()).toEqual('100');
    expect(topContributor).toEqual(masterAddress);
    expect(contribAmount).toEqual(balance);
    expect(currBalance).toEqual(balance);

    // now we will collect the funds on the receive account and check balances again
    const collectReceipt = await smartDonation.collect.confirmed(receiveAddress, {
      from: receiveWallet.account.id,
    });
    if (collectReceipt.result.state === 'FAULT') {
      throw new Error(collectReceipt.result.state);
    }

    expect(collectReceipt.result.value).toEqual(true);

    const newBalance = await smartDonation.getBalance(receiveAddress);
    const newCurrBalance = await smartDonation.getCurrentBalance(receiveAddress);

    expect(newBalance).toEqual(balance);
    expect(newCurrBalance.toString()).toEqual('0');
  });
});
