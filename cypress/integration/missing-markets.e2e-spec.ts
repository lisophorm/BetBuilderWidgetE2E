/// <reference types="cypress" />
/// <reference path="../support/index.ts" />

import 'jspolyfill-array.prototype.findIndex'

let tabMarketLabels = ['Popular', 'Match', 'Teams', 'Players'];
let tabMarketsNames = [
    [
        'How many goals?',
        'How many corners?',
        'How many team corners?',
        'Who will score?',
        'Who will get carded?',

    ],
    [
        'Who will win?',
        'How many goals?',
        'How many corners?',
        'How many booking points?',
        'Who will be ahead at half/full time?',
        'What will the score be?',
        'What else will happen?',
    ],
    [
        'How many team goals?',
        'How many team corners?',
        'Will both teams score?',
        'How many team booking points?',
        'How will a team win?',
        'What else will happen to the teams?',
        'gino',
        'tronico'
    ],
    [
        'How many player goals?',
        'When will a player score?',
        'Who will get carded or sent off?',
        'How will a player score?',
    ]
];

let currentMarket = '';

describe('Missing markets', function () {
    it('Cycle trough tabs', function () {

        cy.visit('/markets?key=' + Cypress.env('key') + '&FixtureId=' + Cypress.env('fixtureId') + '&ConsumerFixtureId=' + Cypress.env('consumerFixtureId') + '&e2e=1');

        cy.waitForRootToLoad();
        cy.get('mdc-tab').each(($el, index, $list) => {
            cy.wrap($el).click({force: true}).then((res) => {
                cy.wait(2000);
            }).then(result => {
                console.log('after click', index)
                cy.get('app-market.tabGroup' + index).each(($el_market, index_market, $list_market) => {
                    cy.wrap($el_market).find('.market-group-title').invoke('text').then((text1) => {
                        currentMarket = text1;
                        var currentArray = [];
                        currentArray = tabMarketsNames[index];
                        // console.log('Now testing', this.currentMarket);
                        // console.log('Markets to check', tabMarketsNames[tabIndex]);
                        // console.log('Markets left', tabMarketsNames[tabIndex]);
                        const pos = currentArray.findIndex(k => {
                            return k.trim() == currentMarket.trim()
                        })
                        if (pos > -1) {
                            tabMarketsNames[index].splice(pos, 1);
                            // return Promise.reject('error' + this.currentMarket);
                        }
                    })
                }).then(res3 => {
                    // return Cypress.Promise.reject('gino');
                    // console.log('after this',tabMarketsNames)
                })
            })

        }).then(res4 => {
            // return Cypress.Promise.reject('gino');
            console.log('are we done?', tabMarketsNames)
            if (tabMarketsNames[0].length > 0) {
                Cypress.log({displayName: tabMarketLabels[0], message: 'Missing Markets ' + tabMarketsNames[0]})
            }
            if (tabMarketsNames[1].length > 0) {
                Cypress.log({displayName: tabMarketLabels[1], message: 'Missing Markets ' + tabMarketsNames[1]})
            }
            if (tabMarketsNames[2].length > 0) {
                Cypress.log({displayName: tabMarketLabels[2], message: 'Missing Markets ' + tabMarketsNames[2]})
            }
            if (tabMarketsNames[3].length > 0) {
                Cypress.log({displayName: tabMarketLabels[3], message: 'Missing Markets ' + tabMarketsNames[3]})
            }

            expect(tabMarketsNames[0].length).to.equal(0,'Missing markets from '+tabMarketLabels[0]);
            expect(tabMarketsNames[1].length).to.equal(0,'Missing markets from '+tabMarketLabels[1])
            expect(tabMarketsNames[2].length).to.equal(0,'Missing markets from '+tabMarketLabels[2])
            expect(tabMarketsNames[3].length).to.equal(0,'Missing markets from '+tabMarketLabels[3])
        })

    });
});
// cy.waitUntil((cy.get('#spinner').should("not.exist")).then(() => {
