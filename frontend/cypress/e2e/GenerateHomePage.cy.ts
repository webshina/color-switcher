/// <reference types="cypress" />

import { LoginPage } from 'cypress/pages/LoginPage';
import { deleteData } from 'cypress/plugins/testDataHandler';
import { sampleGuilds } from '../../../backend/prisma/seeds/sampleData/data';

describe('GenerateHomePage', () => {
  before(() => {
    LoginPage.testLogin();
    deleteData('Guild', { discordId: sampleGuilds.guild1.discordId });
    cy.visit('/guild/create');
  });

  beforeEach(() => {});

  context('Generate', () => {
    it('Target guild can be selected', () => {
      cy.get('#guild-id').select(sampleGuilds.guild1.discordId);
    });
  });
});
