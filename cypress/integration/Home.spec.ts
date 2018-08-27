describe('Home', () => {
  it('features', () => {
    cy.visit('/');

    cy.get('[data-test=debugging-error-trace-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]');
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.wait(250);

    cy.get('[data-test=debugging-console-log-button]').click();
    cy.get('[data-test=neo-one-transaction-toast-title]').should('have.text', 'Transaction Confirmed');
    cy.get('[data-test=neo-one-transaction-toast-message]').should('have.text', 'View on NEO Tracker');
    cy.get('[data-test=neo-one-toast-close-button]').click();
    cy.wait(250);

    cy.get('[data-test=debugging-type-error-button]').click();
    cy.get('[data-test=neo-one-error-toast-title]');
    cy.get('[data-test=neo-one-toast-close-button]').click();
  });
});
