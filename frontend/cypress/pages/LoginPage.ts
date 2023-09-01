export class LoginPage {
  static testLogin() {
    cy.visit('/');
    cy.setCookie('accessToken', Cypress.env('DISCORD_ACCESS_TOKEN'));
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      Cypress.env('DISCORD_ACCESS_TOKEN')
    );
  }
}
