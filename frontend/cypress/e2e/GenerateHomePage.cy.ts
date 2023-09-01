/// <reference types="cypress" />

import { LoginPage } from 'cypress/pages/LoginPage';
import { sampleGuilds } from '../../../backend/prisma/seeds/sampleData/data';

describe('GenerateHomePage', () => {
  beforeEach(() => {
    cy.session('login', () => {
      LoginPage.testLogin();
    });
  });

  beforeEach(() => {
    cy.visit('/guild/create');
  });

  it('Generate button is not shown if no guild is selected', () => {
    cy.get('#guild-id').select('');
    cy.get('#generate-btn').should('not.exist');
  });

  it('Can generate homepage', () => {
    cy.get('#guild-id').select(sampleGuilds.guild1.discordId);
    cy.get('#generate-btn').click();

    cy.get('#generate-btn').should('not.exist');
    cy.contains('Homepage generated successfully');
  });
});
