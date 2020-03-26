/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Can I remove selection by deselecting button', function () {
  it('Remove selection', function () {

    cy.visit('/markets?key=' + Cypress.env('key') + '&FixtureId=' + Cypress.env('fixtureId') + '&ConsumerFixtureId=' + Cypress.env('consumerFixtureId') + '&e2e=1',
      {
        onBeforeLoad: win => {
          Object.defineProperty(win.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
          });
        },
      });

    cy.waitForRootToLoad();
    cy.contains('app-button-bar', 'Who will win the match?').find('.mdc-button').first().click();
    cy.waitForBetSlipItem();
    cy.get('.betSlipItem').should('have.length', 1);
    cy.buttonBar('Who will win the match?').click();
    // cy.contains('app-button-bar', 'Who will win the match?').find('.mdc-button').first().click();
    cy.get('.betSlipItem').should('have.length', 0);
  });
});
// cy.waitUntil((cy.get('#spinner').should("not.exist")).then(() => {
