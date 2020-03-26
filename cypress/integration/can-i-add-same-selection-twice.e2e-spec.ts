/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Can I add the same selection twice', function () {
  it('No i can\'t', function () {

    cy.visit('/markets?key=' + Cypress.env('key') + '&FixtureId=' + Cypress.env('fixtureId') + '&ConsumerFixtureId=' + Cypress.env('consumerFixtureId') + '&e2e=1',
      {
        onBeforeLoad: win => {
          Object.defineProperty(win.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
          });
        },
      });
    cy.waitForRootToLoad();
    cy.get('app-market').first().click({force: true});
    cy.waitForRootToLoad();
    cy.waitForModalLoader();
    cy.get('#submitModalBtn').click();
    cy.waitForModalClose();
    cy.waitForRootToLoad();
    cy.waitForBetSlipItem();
    cy.get('.betSlipItem', {timeout: 20000}).should('exist');
    cy.get('app-market').first().click({force: true});
    cy.get('.modalfooterErrorText').should('have.text', 'Selection already added. Please try another.');
  });
});
// cy.waitUntil((cy.get('#spinner').should("not.exist")).then(() => {
