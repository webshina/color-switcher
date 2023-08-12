/// <reference types="cypress" />

import { sampleGuilds } from 'cypress/fixtures/sampleData/guild';
import { LoginPage } from 'cypress/pages/LoginPage';
import { deleteData } from 'cypress/plugins/testDataHandler';

describe('GenerateHomePage', () => {
  before(() => {
    LoginPage.testLogin();
    deleteData('Guild', { discordId: sampleGuilds.guild1.discordId });
    cy.visit('/');
  });

  beforeEach(() => {});

  context('Validation', () => {
    it('Can not login with wrong password', () => {});
  });
});
