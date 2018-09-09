const ONE_ADDRESS_FOR_ESCROW = 'AaUzsqma2iQ3M1SCNwRFsj4dgRcUVzanSw';

describe('Escrow', () => {
  it('escrow contract', () => {
    // Load wallet with ONE tokens from the ico page
    cy.visit('/ico');

    // Clear local storage
    cy.get('[data-test=neo-one-toolbar-toggle-button]').click();
    cy.get('[data-test=neo-one-settings-button]').click();
    cy.get('[data-test=neo-one-reset-local-state-button]').click();
    cy.get('[data-test=neo-one-settings-dialog-close-button]').click();
    cy.get('[data-test=neo-one-balance-selector-selector]').should('have.text', 'NEO');

    // Check initial state
    cy.get('[data-test=info-address]').should('have.text', 'ONE Address:');
    cy.get('[data-test=info-address-value]').should('have.text', ONE_ADDRESS_FOR_ESCROW);
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
    cy.get('[data-test=contribute-input]').type('10');
    cy.get('[data-test=contribute-button]').click();
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.get('[data-test=info-neo-contributed-value]').should('have.text', '10');
    cy.get('[data-test=info-remaining-value]').should('have.text', '9,999,000,000');

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
