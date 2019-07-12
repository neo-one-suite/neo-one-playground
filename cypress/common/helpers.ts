export const ONE_ADDRESS = 'AUFDAPSgENP4p58Qqq1Fqt4wdDfDhyQs7v';

export const initializeOne = () => {
  cy.visit('/ico');

  // Clear local storage
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();
    cy.wrap(iframe.find('[data-test="neo-one-toolbar-toggle-button"]')[0]).click({ force: true });
    cy.wrap(iframe.find('[data-test="neo-one-settings-button"]')[0]).click({ force: true });
  });
  cy.wait(250);
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-reset-local-state-button"]')[0]).click({ force: true });
    cy.wrap(iframe.find('[data-test="neo-one-settings-dialog-close-button"]')[0]).click({ force: true });
    cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"]')[0]).should('have.text', 'NEO');
  });

  // Check initial state
  cy.get('[data-test=info-address]').should('have.text', 'ONE Address:');
  cy.get('[data-test=info-address-value]').should('have.text', ONE_ADDRESS);

  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-reset-button"]')[0]).click({ force: true });
    cy.wrap(iframe.find('[data-test="neo-one-reset-button"]')[0]).should('have.attr', 'disabled');
    cy.wait(5000);
    cy.wrap(iframe.find('[data-test="neo-one-reset-button"]')[0]).should('not.have.attr', 'disabled');
  });

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
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();
    cy.wrap(iframe.find('[data-test="neo-one-block-time-button"]')[0]).click({ force: true });
    cy.wait(250);
  });

  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();
    cy.wrap(iframe.find('[data-test="neo-one-block-time-dialog-date-time-picker-input"]')[0]).then(($input) => {
      const value = $input.val();

      return cy.task('addSeconds', { value, offset }).then(
        // tslint:disable-next-line no-any
        ({ formatted, time }: any) => {
          cy.wrap(iframe.find('[data-test="neo-one-block-time-dialog-date-time-picker-input"]')[0])
            .clear()
            .type(formatted as string);

          cy.wrap(iframe.find('[data-test="neo-one-block-time-dialog-button"]')[0]).click({ force: true });
          cy.wait(3000);

          if (exists) {
            cy.wrap(iframe.find('[data-test="neo-one-block-time-last-time-value"]')[0]).then(($value) => {
              cy.wrap(iframe.find('[data-test="neo-one-block-time-last-time-value"]')[0]).should(
                'not.have.text',
                $value.text(),
              );

              cy.wrap(iframe.find('[data-test="neo-one-block-time-last-time-value"]')[0]).then(($currentValue) => {
                const lastTimeValue = new Date($currentValue.text()).valueOf();
                expect(lastTimeValue).to.be.gte(time);
              });
            });
          } else {
            cy.get('iframe').then(($reIframe) => {
              const reIframe = $reIframe.contents();

              cy.wrap(reIframe.find('[data-test="neo-one-block-time-last-time-value"]')[0]).then(($value) => {
                const lastTimeValue = new Date($value.text()).valueOf();
                expect(lastTimeValue).to.be.gte(time);
              });
            });
          }
        },
      );
    });
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
  checkTransactionToast('View on NEO Tracker');
  cy.get('[data-test=info-neo-contributed-value]').should('have.text', '10');
  cy.get('[data-test=info-remaining-value]').should('have.text', '9,999,000,000');
  cy.get('[data-test=info-balance-value]').should('have.text', '1,000,000');

  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-balance-selector-value"]')[0]).should('have.text', '98,888,854');
    cy.wrap(iframe.find('[data-test="neo-one-balance-selector-selector"]')[0]).should('have.text', 'NEO');
  });
};

export const checkErrorToast = (message?: string) => {
  cy.wait(1000);
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-toast-heading"]')[0]).should(
      'have.text',
      'Error. See console for more info.',
    );
    if (message !== undefined) {
      cy.wrap(iframe.find('[data-test="neo-one-error-toast-message"]')[0]).should('have.text', message);
    }
    cy.wrap(iframe.find('[data-test="neo-one-toast-close-button"]')[0]).click({ force: true });
  });
};

export const checkTransactionToast = (message?: string) => {
  cy.wait(2000);
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-toast-heading"]')[0]).should('have.text', 'Transaction Confirmed');
    if (message !== undefined) {
      cy.wrap(iframe.find('[data-test="neo-one-transaction-toast-message"]')[0]).should('have.text', message);
    }
    cy.wrap(iframe.find('[data-test="neo-one-toast-close-button"]')[0]).click({ force: true });
  });
};

export const selectWallet = ({
  prevWallet = 'master',
  newWallet,
}: {
  readonly prevWallet?: string;
  readonly newWallet: string;
}) => {
  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-wallet-value"]')[0]).should('have.text', prevWallet);
    cy.wrap(iframe.find('[data-test="neo-one-wallet-value"]')[0]).click({ force: true });
  });

  cy.get('iframe').then(($iframe) => {
    const iframe = $iframe.contents();

    cy.wrap(iframe.find('[data-test="neo-one-wallet-selector-selector"]')[0]).should('have.text', prevWallet);
    cy.wrap(iframe.find('[data-test="neo-one-wallet-selector-selector"] .react-select__input > input')[0]).type(
      `${newWallet}{enter}`,
      {
        force: true,
      },
    );
    cy.wrap(iframe.find('[data-test="neo-one-wallet-selector-selector"]')[0]).contains(newWallet);
    cy.wrap(iframe.find('[data-test="neo-one-wallet-dialog-close-button"]')[0]).click({ force: true });
    cy.wrap(iframe.find('[data-test="neo-one-wallet-value"]')[0]).should('have.text', newWallet);
  });
};
