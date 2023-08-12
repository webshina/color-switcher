import { adminUserData } from '../../../backend/prisma/seeds/data';

export class LoginPage {
  static testLogin() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/auth/test-login`,
      body: {
        discordAccessToken: adminUserData.discordAccessToken,
        discordRefreshToken: adminUserData.discordRefreshToken,
      },
    }).then((res) => {
      // Get cookie 'accessToken'
      console.log('res.headers', res.headers);
      const accessToken = res.headers['set-cookie'][0]
        .split(';')[0]
        .split('=')[1];
      console.log('accessToken', accessToken);
      expect(accessToken).to.eq(adminUserData.discordAccessToken);
    });
  }
}
