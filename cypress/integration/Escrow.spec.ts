import { checkTransactionToast, contribute, fastForward, initializeOne, selectWallet } from '../common';

describe('Escrow', () => {
  it('escrow contract', () => {
    // Load wallet with ONE tokens from the ico page
    initializeOne();
    fastForward(3610);
    contribute();

    cy.visit('/escrow');

    // Check initial state
    cy.get('[data-test=from-account-header]').should('have.text', 'From Account');
    cy.get('[data-test=escrow-account-header]').should('have.text', 'Escrow Account');
    cy.get('[data-test=to-account-header]').should('have.text', 'To Account');
    cy.get('[data-test=from-account-balance-label]').should('have.text', 'Balance:');
    cy.get('[data-test=from-account-balance]').should('have.text', '1,000,000');
    cy.get('[data-test=escrow-account-balance-label]').should('have.text', 'Balance:');
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=to-account-balance-label]').should('have.text', 'Balance:');
    cy.get('[data-test=to-account-balance]').should('have.text', '0');
    cy.get('[data-test=send-one-input]').should('have.text', '');
    cy.get('[data-test=send-one-button]').should('have.text', 'Send');
    cy.get('[data-test=revoke-one-input]').should('have.text', '');
    cy.get('[data-test=revoke-one-button]').should('have.text', 'Revoke');
    cy.get('[data-test=receive-one-input]').should('have.text', '');
    cy.get('[data-test=receive-one-button]').should('have.text', 'Receive');
    cy.get('[data-test=escrow-wallet-selector]').should('have.text', 'Select...');

    // Attempt to send with unselected To Account
    cy.get('[data-test=send-one-input]').type('10');
    cy.get('[data-test=send-one-button]').should('have.attr', 'disabled');
    cy.get('[data-test=send-one-input]').clear();

    // Attempt to receive with unselected To Account
    cy.get('[data-test=receive-one-input]').type('10');
    cy.get('[data-test=receive-one-button]').should('have.attr', 'disabled');
    cy.get('[data-test=receive-one-input]').clear();

    // Attempt to revoke with unselected To Account
    cy.get('[data-test=revoke-one-input]').type('10');
    cy.get('[data-test=revoke-one-button]').should('have.attr', 'disabled');
    cy.get('[data-test=revoke-one-input]').clear();

    // Select To Account
    cy.get('[data-test=escrow-wallet-selector]').click();
    cy.get('[data-test=escrow-wallet-selector] .react-select__input > input').type('alfa{enter}', { force: true });
    cy.get('[data-test=escrow-wallet-selector]').contains('alfa');

    // Send ONE to escrow
    cy.get('[data-test=send-one-input]').type('50');
    cy.get('[data-test=send-one-button]').click();
    cy.get('[data-test=escrow-account-balance]').should('have.text', '50');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '0');
    checkTransactionToast('View on NEO Tracker');

    // Receive ONE to selected wallet
    cy.get('[data-test=receive-one-input]').type('30');
    cy.get('[data-test=receive-one-button]').click();
    cy.get('[data-test=escrow-account-balance]').should('have.text', '20');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');
    checkTransactionToast('View on NEO Tracker');

    // Select Different Account
    cy.get('[data-test=escrow-wallet-selector]').click();
    cy.get('[data-test=escrow-wallet-selector] .react-select__input > input').type('charlie{enter}', { force: true });
    cy.get('[data-test=escrow-wallet-selector]').contains('charlie');
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '0');

    // Attempt to receive balance from empty escrow account
    cy.get('[data-test=receive-one-input]').type('10');
    cy.get('[data-test=receive-one-button]').should('have.attr', 'disabled');
    cy.get('[data-test=receive-one-input]').clear();

    // Attempt to revoke balance from empty escrow account
    cy.get('[data-test=revoke-one-input]').type('10');
    cy.get('[data-test=revoke-one-button]').should('have.attr', 'disabled');
    cy.get('[data-test=revoke-one-input]').clear();

    // Reselect Original Account
    cy.get('[data-test=escrow-wallet-selector]').click();
    cy.get('[data-test=escrow-wallet-selector] .react-select__input > input').type('alfa{enter}', { force: true });
    cy.get('[data-test=escrow-wallet-selector]').contains('alfa');
    cy.get('[data-test=escrow-account-balance]').should('have.text', '20');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');

    // Revoke remaining balance
    cy.get('[data-test=revoke-one-input]').type('20');
    cy.get('[data-test=revoke-one-button]').click();
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,970');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');
    checkTransactionToast('View on NEO Tracker');

    // Select different empty From Account
    selectWallet({ newWallet: 'bravo' });
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=from-account-balance]').should('have.text', '0');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');

    // Attempt to send more balance than available
    cy.get('[data-test=send-one-input]').type('10');
    cy.get('[data-test=send-one-button]').should('have.attr', 'disabled');
  });
});
