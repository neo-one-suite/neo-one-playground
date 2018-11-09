import { checkErrorToast, contribute, fastForward, initializeOne, ONE_ADDRESS, selectWallet } from '../common';

describe('One', () => {
  it('participation', () => {
    initializeOne();

    // Failed contribute
    cy.get('[data-test=contribute-input]').type('10');
    cy.get('[data-test=contribute-amount]').should('have.text', '= 1,000,000 ONE');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=contribute-input]').should('have.value', '10');
    cy.get('[data-test=contribute-amount]').should('have.text', '= 1,000,000 ONE');
    checkErrorToast('Verification did not succeed.');
    cy.get('[data-test=contribute-input]').clear();

    // Fast forward and contribute
    fastForward(3610);
    contribute();

    // Add ONE to settings
    cy.get('iframe').then(($iframe) => {
      const iframe = $iframe.contents();

      cy.wrap(iframe.find('[data-test="neo-one-settings-button"]')[0]).click({ force: true });
    });

    cy.get('iframe').then(($iframe) => {
      const iframe = $iframe.contents();

      cy.wrap(iframe.find('[data-test="neo-one-add-token-input"]')[0]).type(ONE_ADDRESS);
      cy.wrap(iframe.find('[data-test="neo-one-add-token-button"]')[0]).click({ force: true });
      cy.wrap(iframe.find('[data-test="neo-one-settings-dialog-close-button"]')[0]).click({ force: true });
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"]')[0]).should('have.text', 'ONE');
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-value"]')[0]).should('have.text', '1,000,000');
    });

    // Switch to empty wallet
    selectWallet({ newWallet: 'alfa' });

    // Check empty wallet
    cy.get('iframe').then(($iframe) => {
      const iframe = $iframe.contents();

      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"] .react-select__input > input')[0]).type(
        'ONE{enter}',
        {
          force: true,
        },
      );
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"]')[0]).contains('ONE');
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-value"]')[0]).should('have.text', '0');
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"] .react-select__input > input')[0]).type(
        'NEO{enter}',
        {
          force: true,
        },
      );
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"]')[0]).contains('NEO');
      cy.wrap(iframe.find('[data-test="neo-one-balance-selector-value"]')[0]).should('have.text', '0');
    });

    // Contribute from empty wallet
    cy.get('[data-test=contribute-input]').type('5');
    cy.get('[data-test=contribute-amount]').should('have.text', '= 500,000 ONE');
    cy.get('[data-test=contribute-button]').click();
    checkErrorToast('Found 0 funds, required: 5.');

    // Switch back to master wallet
    selectWallet({ prevWallet: 'alfa', newWallet: 'master' });

    // Fast forward past end
    fastForward(24 * 60 * 60, true);
    cy.get('[data-test=info-countdown]').should('have.text', 'Time Left:');
    cy.get('[data-test=info-countdown-value]').should('have.text', 'Ended');
    cy.get('[data-test=contribute-button]').click();

    checkErrorToast('Verification did not succeed.');

    // Close toolbar. We did it!
    cy.get('iframe').then(($iframe) => {
      const iframe = $iframe.contents();

      cy.wrap(iframe.find('[data-test="neo-one-toolbar-toggle-button"]')).click({ force: true });
      cy.wrap(iframe.find('[data-test="neo-one-settings-button"]')).should('not.be.visible');
    });
  });
});
