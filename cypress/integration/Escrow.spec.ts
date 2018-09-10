import { contribute, fastForward, initializeOne } from './__data__';

describe('Escrow', () => {
  it('escrow contract', () => {
    // Load wallet with ONE tokens from the ico page
    initializeOne();
    fastForward(3600);
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
    cy.get('[data-test=send-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. No "To Account" selected.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.get('[data-test=send-one-input]').clear();

    // Attempt to receive with unselected To Account
    cy.get('[data-test=receive-one-input]').type('10');
    cy.get('[data-test=receive-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. No "To Account" selected.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.get('[data-test=receive-one-input]').clear();

    // Attempt to revoke with unselected To Account
    cy.get('[data-test=revoke-one-input]').type('10');
    cy.get('[data-test=revoke-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. No "To Account" selected.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click();
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
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Receive ONE to selected wallet
    cy.get('[data-test=receive-one-input]').type('30');
    cy.get('[data-test=receive-one-button]').click();
    cy.get('[data-test=escrow-account-balance]').should('have.text', '20');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Select Different Account
    cy.get('[data-test=escrow-wallet-selector]').click();
    cy.get('[data-test=escrow-wallet-selector] .react-select__input > input').type('charlie{enter}', { force: true });
    cy.get('[data-test=escrow-wallet-selector]').contains('charlie');
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=from-account-balance]').should('have.text', '999,950');
    cy.get('[data-test=to-account-balance]').should('have.text', '0');

    // Attempt to receive balance from empty escrow account
    cy.get('[data-test=receive-one-input]').type('10');
    cy.get('[data-test=receive-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. Not enough balance.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click({ multiple: true });
    cy.get('[data-test=receive-one-input]').clear();

    // Attempt to revoke balance from empty escrow account
    cy.get('[data-test=revoke-one-input]').type('10');
    cy.get('[data-test=revoke-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. Not enough balance.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click({ multiple: true });
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
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Select different empty From Account
    cy.get('[data-test=neo-one-toolbar-toggle-button]').click();
    cy.get('[data-test=neo-one-wallet-value]').should('have.text', 'master');
    cy.get('[data-test=neo-one-wallet-value]').click();
    cy.get('[data-test=neo-one-wallet-selector-selector]').should('have.text', 'master');
    cy.get('[data-test=neo-one-wallet-selector-selector] .react-select__input > input').type('bravo{enter}', {
      force: true,
    });
    cy.get('[data-test=neo-one-wallet-selector-selector]').contains('bravo');
    cy.get('[data-test=neo-one-wallet-dialog-close-button]').click();
    cy.get('[data-test=escrow-account-balance]').should('have.text', '0');
    cy.get('[data-test=from-account-balance]').should('have.text', '0');
    cy.get('[data-test=to-account-balance]').should('have.text', '30');

    // Attempt to send more balance than available
    cy.get('[data-test=send-one-input]').type('10');
    cy.get('[data-test=send-one-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should(
      'have.text',
      'Unable to complete transfer. Not enough balance.',
    );
    cy.get('[data-test=neo-one-toast-close-button]').click({ multiple: true });
  });
});
