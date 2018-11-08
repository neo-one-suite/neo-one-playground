import { checkErrorToast, checkTransactionToast } from '../common';

describe('Home', () => {
  it('features', () => {
    cy.visit('/');

    cy.get('[data-test=debugging-error-trace-button]').click();
    checkErrorToast();
    cy.wait(250);

    cy.get('[data-test=debugging-console-log-button]').click();
    checkTransactionToast();
    cy.wait(250);

    cy.get('[data-test=debugging-type-error-button]').click();
    checkErrorToast();
  });
});
