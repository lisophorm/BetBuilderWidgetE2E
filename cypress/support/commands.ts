// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import 'cypress-wait-until';

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('waitForRootToLoad', () => {
    return cy.get('#spinner', {timeout: 20000}).should('not.exist', {message: 'preloader overlay disappeared'}, {message: 'preloader overlay disappeared'});
})

Cypress.Commands.add('waitForModalClose', () => {
    return cy.get('.modal-dialog', {timeout: 20000}).should('not.exist');
})

Cypress.Commands.add('waitForModalLoader', () => {
    return cy.get('#oddsBox', {timeout: 20000}).should('exist',{message:'ciao'});
})

Cypress.Commands.add('waitForBetSlipItem', (delay) => {
    console.log('value of delay', delay);
    if (typeof delay === 'undefined') {
        delay = 5000;
    }
    return cy.get('.betSlipItem', {timeout: delay}).should('exist');
})

Cypress.Commands.add('buttonBar', (buttonLabel) => {
    return cy.contains('app-button-bar', buttonLabel).find('.mdc-button').first()

})




