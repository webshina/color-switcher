export class LoginPage {
  static url: string = '/login';
  static adminEmail: string = 'favo.ad22@gmail.com';
  static adminPassword: string = 'Nft12345';

  static visit() {
    cy.visit(LoginPage.url);
  }

  static adminLogin(
    email = LoginPage.adminEmail,
    password = LoginPage.adminPassword
  ) {
    this.visit();
    cy.get('[id="email"]').type(email);
    cy.get('[id="password"]').type(password);
    cy.get('[data-cy=login-btn]').click();
    cy.contains('Trainer Management', { timeout: 10000 });
  }

  static trainerLogin(email: string, password: string) {
    this.visit();
    cy.get('[id="email"]').type(email);
    cy.get('[id="password"]').type(password);
    cy.get('[data-cy=login-btn]').click();
    cy.contains('トレーナー用ページ', { timeout: 10000 });
  }

  static customerLogin(email: string, password: string) {
    this.visit();
    cy.get('[id="email"]').type(email);
    cy.get('[id="password"]').type(password);
    cy.get('[data-cy=login-btn]').click();
    cy.contains('Account', { timeout: 10000 });
  }
}
