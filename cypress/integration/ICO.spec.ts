const ONE_ADDRESS = 'ASYC75k6YFw6PMrNauAjZupzRiQz41irwW';

describe('ICO', () => {
  it('participation', () => {
    cy.visit('/ico');

    // Clear local storage
    cy.get('[data-test=neo-one-toolbar-toggle-button]').click();
    cy.get('[data-test=neo-one-settings-button]').click();
    cy.get('[data-test=neo-one-reset-local-state-button]').click();
    cy.get('[data-test=neo-one-settings-dialog-close-button]').click();
    cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'NEO');

    // Check initial state
    cy.get('[data-test=info-address]').should('have.text', 'ONE Address:');
    cy.get('[data-test=info-address-value]').should('have.text', ONE_ADDRESS);
    cy.get('[data-test=neo-one-reset-button]').click();
    cy.get('[data-test=neo-one-reset-button]').should('have.attr', 'disabled');
    cy.get('[data-test=neo-one-reset-button]', { timeout: 10000 }).should('not.have.attr', 'disabled');
    cy.get('[data-test=info-countdown]').should('have.text', 'Countdown:');
    cy.get('[data-test=info-countdown-value]').then(($element) => {
      const text = $element.text();
      if (text === '1 hour') {
        expect(text).to.equal('1 hour');
      } else {
        expect(parseInt(text.slice(0, 2), 10)).to.be.gte(55);
      }
    });
    cy.get('[data-test=info-neo-contributed]').should('have.text', 'NEO Contributed:');
    cy.get('[data-test=info-neo-contributed-value]').should('have.text', '0');
    cy.get('[data-test=info-remaining]').should('have.text', 'Remaining:');
    cy.get('[data-test=info-remaining-value]').should('have.text', '10,000,000,000');
    cy.get('[data-test=info-balance]').should('have.text', 'Your Balance:');
    cy.get('[data-test=info-balance-value]').should('have.text', '0');

    // Failed contribute
    cy.get('[data-test=contribute-input]').type('10');
    cy.get('[data-test=contibute-amount]').should('have.text', '= 1,000,000 ONE');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=contribute-input]').should('have.value', '10');
    cy.get('[data-test=contibute-amount]').should('have.text', '= 1,000,000 ONE');
    cy.get('[data-test=neo-one-error-toast-title]').should('have.text', 'Error. See console for more info.');
    cy.get('[data-test=neo-one-error-toast-message]').should('have.text', 'Verification did not succeed.');
    cy.get('[data-test=neo-one-toast-close-button]').click();

    // Fast forward and contribute
    cy.get('[data-test=neo-one-block-time-button]').click();
    const fastForward = (offset: number, exists = false) => {
      cy.get('[data-test=neo-one-block-time-dialog-date-time-picker-input]').then(($input) => {
        const value = $input.val();
        cy.task('addSeconds', { value, offset }).then(
          // tslint:disable-next-line no-any
          ({ formatted, time }: any) => {
            cy.get('[data-test=neo-one-block-time-dialog-date-time-picker-input]')
              .clear()
              .type(formatted as string);
            if (exists) {
              cy.get('[data-test=neo-one-block-time-last-time-value]').then(($value) => {
                cy.get('[data-test=neo-one-block-time-dialog-button]').click();
                cy.get('[data-test=neo-one-block-time-last-time-value]').should('not.have.text', $value.text());
                cy.get('[data-test=neo-one-block-time-last-time-value]').then(($currentValue) => {
                  const lastTimeValue = new Date($currentValue.text()).valueOf();
                  expect(lastTimeValue).to.be.gte(time);
                });
              });
            } else {
              cy.get('[data-test=neo-one-block-time-dialog-button]').click();
              cy.get('[data-test=neo-one-block-time-last-time-value]').then(($value) => {
                const lastTimeValue = new Date($value.text()).valueOf();
                expect(lastTimeValue).to.be.gte(time);
              });
            }
          },
        );
      });
    };
    fastForward(3600);
    cy.get('[data-test=info-countdown]').should('have.text', 'Time Left:');
    cy.get('[data-test=info-countdown-value]').then(($element) => {
      const text = $element.text();
      if (text === '1 day') {
        expect(text).to.equal('1 day');
      } else {
        expect(text).to.equal('24 hours');
      }
    });
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.get('[data-test=info-neo-contributed-value]').should('have.text', '10');
    cy.get('[data-test=info-remaining-value]').should('have.text', '9,999,000,000');
    cy.get('[data-test=info-balance-value]').should('have.text', '1,000,000');
    cy.get('[data-test=neo-one-balance-selector-value]').should('have.text', '98,888,854');
    cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'NEO');

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
    cy.get('[data-test=neo-one-block-time-button]').click();
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
