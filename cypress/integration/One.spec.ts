import { contribute, fastForward, initializeOne, ONE_ADDRESS } from './__data__';

describe('One', () => {
  it('participation', () => {
    initializeOne();

    // Failed contribute
    cy.get('[data-test=contribute-input]').type('10');
    cy.get('[data-test=contibute-amount]').should('have.text', '= 1,000,000 ONE');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=contribute-input]').should('have.value', '10');
    cy.get('[data-test=contibute-amount]').should('have.text', '= 1,000,000 ONE');
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should('have.text', 'Verification did not succeed.');
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.get('[data-test=contribute-input]').clear();

    // Fast forward and contribute
    fastForward(3600);
    contribute();

    // Add ONE to settings
    cy.get('[data-test=neo-one-settings-button]').click();
    cy.get('[data-test=neo-one-add-token-input]').type(ONE_ADDRESS);
    cy.get('[data-test=neo-one-add-token-button]').click();
    cy.get('[data-test=neo-one-settings-dialog-close-button]').click();
    cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'ONE');
    cy.get('[data-test=neo-one-balance-selector-value]').should('have.text', '1,000,000');

    // Switch to empty wallet
    cy.get('[data-test=neo-one-wallet-value]').should('have.text', 'master');
    cy.get('[data-test=neo-one-wallet-value]').click();
    cy.get('[data-test=neo-one-wallet-selector-selector]').should('have.text', 'master');
    cy.get('[data-test=neo-one-wallet-selector-selector] .react-select__input > input').type('alfa{enter}', {
      force: true,
    });
    cy.get('[data-test=neo-one-wallet-selector-selector]').contains('alfa');
    cy.get('[data-test=neo-one-wallet-dialog-close-button]').click();
    cy.get('[data-test=neo-one-wallet-value]').should('have.text', 'alfa');
    cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'ONE');
    cy.get('[data-test=neo-one-balance-selector-value]').should('have.text', '0');
    cy.get('[data-test=neo-one-balance-selector-selector] .react-select__input > input').type('NEO{enter}', {
      force: true,
    });
    cy.get('[data-test=neo-one-balance-selector-selector]').contains('NEO');
    cy.get('[data-test=neo-one-balance-selector-value]').should('have.text', '0');

    // Contribute from empty wallet
    cy.get('[data-test=contribute-input]').type('5');
    cy.get('[data-test=contibute-amount]').should('have.text', '= 500,000 ONE');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should('have.text', 'Found 0 funds, required: 5.');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Switch back to master wallet
    cy.get('[data-test=neo-one-wallet-value]').click();
    cy.get('[data-test=neo-one-wallet-selector-selector] .react-select__input > input').type('master{enter}', {
      force: true,
    });
    cy.get('[data-test=neo-one-wallet-selector-selector]').contains('master');
    cy.get('[data-test=neo-one-wallet-dialog-close-button]').click();
    cy.get('[data-test=neo-one-wallet-value]').should('have.text', 'master');

    // Fast forward past end
    fastForward(24 * 60 * 60, true);
    cy.get('[data-test=info-countdown]').should('have.text', 'Time Left:');
    cy.get('[data-test=info-countdown-value]').should('have.text', 'Ended');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should('have.text', 'Verification did not succeed.');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Close toolbar. We did it!
    cy.get('[data-test=neo-one-toolbar-toggle-button]').click();
    cy.get('[data-test=neo-one-settings-button]').should('not.be.visible');
  });
});
