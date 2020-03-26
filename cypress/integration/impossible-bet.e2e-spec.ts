/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Impossible bet', function () {
  it('Tries an impossible bet', function () {

    console.log('ENV', Cypress.env('devices')[0]);

    cy.visit('/markets?key=' + Cypress.env('key') + '&FixtureId=' + Cypress.env('fixtureId') + '&ConsumerFixtureId=' + Cypress.env('consumerFixtureId') + '&e2e=1');

    cy.waitForRootToLoad();
    cy.buttonBar('Who will win the match?').click();
    cy.waitForRootToLoad();
    cy.waitForBetSlipItem();
    cy.contains('app-market', 'How many goals').find('.market-group-title').click();
    cy.waitForModalLoader();
    cy.get('#e2eDataPickerInput' + '0').type('1');
    cy.get('#sendDataPickerValues').click();
    cy.waitForModalLoader();
    cy.get('.modalfooterErrorText').should('have.text', 'We\'ve been unable to calculate odds. Please try a different selection.');

  });
});
// cy.waitUntil((cy.get('#spinner').should("not.exist")).then(() => {
