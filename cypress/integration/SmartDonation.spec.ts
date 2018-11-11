import { checkTransactionToast, contribute, fastForward, initializeOne, selectWallet } from '../common';

describe('Smart Donation', () => {
  it('smart-donation contract', () => {
    // Load wallet with ONE tokens from the ico page
    initializeOne();
    fastForward(3610);
    contribute();

    cy.visit('/smart-donation');

    // Check initial state
    cy.get('[data-test=manager-header').should('have.text', 'Smart Donation Manager');
    cy.get('[data-test=manager-address-header').should('have.text', 'Current Address');
    cy.get('[data-test=manager-message-header').should('have.text', 'Current Message');
    cy.get('[data-test=manager-address-value').should('have.text', 'AXNajBTQLxWHwc9sKyXcc4UdbJvp3arYDG');
    cy.get('[data-test=manager-message-value').should('have.text', 'Address is not set up');
    cy.get('[data-test=manager-total-header').should('have.text', 'Total Contributions:');
    cy.get('[data-test=manager-available-header').should('have.text', 'Available Balance:');
    cy.get('[data-test=manager-total-value').should('have.text', '');
    cy.get('[data-test=manager-available-value').should('have.text', '');
    cy.get('[data-test=manager-setup-button').should('have.text', 'Setup');
    cy.get('[data-test=message-button').should('have.text', 'Update');
    cy.get('[data-test=message-box-input').should('have.text', '');
    cy.get('[data-test=viewer-header').should('have.text', 'Smart Donation Viewer');
    cy.get('[data-test=viewer-header-popover').should('have.text', 'Select an account to view info and donate!');
    cy.get('[data-test=viewer-wallet-selector').should('have.text', 'Select...');
    cy.get('[data-test=viewer-address-header').should('have.text', 'Donation Address');
    cy.get('[data-test=viewer-message-header').should('have.text', 'Global Message');
    cy.get('[data-test=viewer-contributions-header').should('have.text', 'Total Contributions');
    cy.get('[data-test=viewer-top-header').should('have.text', 'Top Contributor Message');
    cy.get('[data-test=viewer-address-value').should('have.text', '');
    cy.get('[data-test=viewer-message-value').should('have.text', '');
    cy.get('[data-test=viewer-contributions-value').should('have.text', '');
    cy.get('[data-test=viewer-top-value').should('have.text', '');
    cy.get('[data-test=viewer-selected-header').should('have.text', 'Selected Account');
    cy.get('[data-test=viewer-amount-header').should('have.text', 'Amount Contributed:');
    cy.get('[data-test=viewer-contributor-message-header').should('have.text', 'Contribution Message:');
    cy.get('[data-test=viewer-one-header').should('have.text', 'Available ONE:');
    cy.get('[data-test=viewer-selected-value').should('have.text', 'master');
    cy.get('[data-test=viewer-amount-value').should('have.text', '');
    cy.get('[data-test=viewer-contributor-message-value').should('have.text', '');
    cy.get('[data-test=viewer-one-value').should('have.text', '1,000,000');
    cy.get('[data-test=contribute-message-input').should('have.text', '');
    cy.get('[data-test=contribute-one-input').should('have.text', '');
    cy.get('[data-test=contribute-button').should('have.text', 'Contribute');

    // Attempt to update with non-setup address
    cy.get('[data-test=message-box-input]').type('test');
    cy.get('[data-test=message-button]').should('have.attr', 'disabled');
    cy.get('[data-test=message-box-input]').clear();

    // attempt to contribute to undefined account update-message
    cy.get('[data-test=contribute-message-input]').type('test');
    cy.get('[data-test=contribute-button]').should('have.attr', 'disabled');
    cy.get('[data-test=contribute-message-input]').clear();

    // attempt to contribute to undefined account contribute - no message
    cy.get('[data-test=contribute-one-input]').type('100');
    cy.get('[data-test=contribute-button]').should('have.attr', 'disabled');
    cy.get('[data-test=contribute-one-input]').clear();

    // attempt to contribute to undefined account contribute - message
    cy.get('[data-test=contribute-message-input]').type('test');
    cy.get('[data-test=contribute-one-input]').type('100');
    cy.get('[data-test=contribute-button]').should('have.attr', 'disabled');
    cy.get('[data-test=contribute-message-input]').clear();
    cy.get('[data-test=contribute-one-input]').clear();

    // select receive account
    cy.get('[data-test=viewer-wallet-selector]').click();
    cy.get('[data-test=viewer-wallet-selector] .react-select__input > input').type('alfa{enter}', { force: true });
    cy.get('[data-test=viewer-wallet-selector]').contains('alfa');

    // Attempt to update with non-setup address
    cy.get('[data-test=message-box-input]').type('test');
    cy.get('[data-test=message-button]').should('have.attr', 'disabled');
    cy.get('[data-test=message-box-input]').clear();

    // select alfa account to setup
    selectWallet({ prevWallet: 'master', newWallet: 'alfa' });
    cy.get('[data-test=manager-address-value').should('have.text', 'AJhQdvufGvmmi7wxNizbttEW4Kzd1dMjR8');
    cy.get('[data-test=viewer-selected-value').should('have.text', 'alfa');
    cy.get('[data-test=viewer-one-value').should('have.text', '0');

    // confirm alfa not setup
    cy.get('[data-test=manager-message-value').should('have.text', 'Address is not set up');
    cy.get('[data-test=manager-total-value').should('have.text', '');
    cy.get('[data-test=manager-available-value').should('have.text', '');

    // setup alfa
    cy.get('[data-test=setup-button').click();
    checkTransactionToast('View on NEO Tracker');
    cy.get('[data-test=manager-message-value').should('have.text', '');
    cy.get('[data-test=manager-total-value').should('have.text', '');
    cy.get('[data-test=manager-available-value').should('have.text', '');

    // update a setup accounts global message
    cy.get('[data-test=contribute-button]').should('have.attr', 'disabled');
    cy.get('[data-test=message-box-input').type('test');
    cy.get('[data-test=message-button').click();
    checkTransactionToast('View on NEO Tracker');
    cy.get('[data-test=manager-message-value').should('have.text', 'test');

    // switch back to master account
    selectWallet({ prevWallet: 'alfa', newWallet: 'master' });
    cy.get('[data-test=manager-address-value').should('have.text', 'AXNajBTQLxWHwc9sKyXcc4UdbJvp3arYDG');
    cy.get('[data-test=viewer-selected-value').should('have.text', 'master');
    cy.get('[data-test=viewer-one-value').should('have.text', '1,000,000');

    // select alfa account to donate to
    cy.get('[data-test=viewer-wallet-selector]').click();
    cy.get('[data-test=viewer-wallet-selector] .react-select__input > input').type('alfa{enter}', { force: true });
    cy.get('[data-test=viewer-wallet-selector]').contains('alfa');
    cy.get('[data-test=viewer-address-value').should('have.text', 'AJhQdvufGvmmi7wxNizbttEW4Kzd1dMjR8');
    cy.get('[data-test=viewer-message-value').should('have.text', 'test');
    cy.get('[data-test=viewer-contributions-value').should('have.text', '0');
    cy.get('[data-test=viewer-top-value').should('have.text', '');

    // donate to a setup account
    cy.get('[data-test=contribute-button').should('have.text', 'Contribute');
    cy.get('[data-test=contribute-button').should('have.attr', 'disabled');
    cy.get('[data-test=contribute-message-input').should('have.text', '');
    cy.get('[data-test=contribute-message-input').type('beep');
    cy.get('[data-test=contribute-button').should('have.text', 'Set Message');
    cy.get('[data-test=contribute-one-input').type('10');
    cy.get('[data-test=contribute-button').should('have.text', 'Contribute');
    cy.get('[data-test=contribute-button').click();
    checkTransactionToast('View on NEO Tracker');

    // confirm donation
    cy.get('[data-test=viewer-amount-value').should('have.text', '10');
    cy.get('[data-test=viewer-top-value').should('have.text', 'beep');

    // update contribution message, no donation
    cy.get('[data-test=contribute-message-input').type('bang');
    cy.get('[data-test=contribute-button').should('have.text', 'Set Message');
    cy.get('[data-test=contribute-button').click();
    checkTransactionToast('View on NEO Tracker');
    cy.get('[data-test=viewer-amount-value').should('have.text', '10');
    cy.get('[data-test=viewer-top-value').should('have.text', 'bang');

    // switch back to alfa account
    selectWallet({ prevWallet: 'master', newWallet: 'alfa' });
    cy.get('[data-test=manager-address-value').should('have.text', 'AJhQdvufGvmmi7wxNizbttEW4Kzd1dMjR8');
    cy.get('[data-test=viewer-selected-value').should('have.text', 'alfa');
    cy.get('[data-test=viewer-one-value').should('have.text', '0');

    // collect from a setup account / confirm
    cy.get('[data-test=collect-button]').click();
    checkTransactionToast('View on NEO Tracker');
    cy.get('[data-test=manager-total-value').should('have.text', '10');
    cy.get('[data-test=manager-available-value').should('have.text', '0');
    cy.get('[data-test=viewer-one-value').should('have.text', '10');
  });
});
