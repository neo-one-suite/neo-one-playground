export const ONE_ADDRESS = 'AaUzsqma2iQ3M1SCNwRFsj4dgRcUVzanSw';

export const initializeOne = () => {
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
};

export const fastForward = (offset: number, exists = false) => {
  cy.get('[data-test=neo-one-block-time-button]').click();
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

export const contribute = () => {
  cy.get('[data-test=info-countdown]').should('have.text', 'Time Left:');
  cy.get('[data-test=info-countdown-value]').then(($element) => {
    const text = $element.text();
    if (text === '1 day') {
      expect(text).to.equal('1 day');
    } else {
      expect(text).to.equal('24 hours');
    }
  });
  cy.get('[data-test=contribute-input]').type('10');
  cy.get('[data-test=contribute-button]').click();
  cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
  cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
  cy.get('[data-test=neo-one-toast-close-button]').click();
  cy.get('[data-test=info-neo-contributed-value]').should('have.text', '10');
  cy.get('[data-test=info-remaining-value]').should('have.text', '9,999,000,000');
  cy.get('[data-test=info-balance-value]').should('have.text', '1,000,000');
  cy.get('[data-test=neo-one-balance-selector-value]').should('have.text', '98,888,854');
  cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'NEO');
};
