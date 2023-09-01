/// <reference types="cypress" />

describe('TEST', () => {
  beforeEach(() => {
    cy.session('login', () => {
      Cypress.Cookies.debug(true);
      cy.setCookie('accessToken', Cypress.env('DISCORD_ACCESS_TOKEN'));
    });
  });

  context('TEST', () => {
    it('First', () => {
      cy.visit('/');
      cy.getCookie('accessToken').should(
        'have.property',
        'value',
        Cypress.env('DISCORD_ACCESS_TOKEN')
      );
    });

    it('Second', () => {
      cy.visit('/');
      cy.getCookie('accessToken').should(
        'have.property',
        'value',
        Cypress.env('DISCORD_ACCESS_TOKEN')
      );
    });
  });
});
