import { LoginPage } from 'cypress/pages/LoginPage';

export const _signInAdmin = async () => {
  LoginPage.testLogin();
};

export const initData = () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/test/seed`,
    body: {
      method: 'init',
    },
  });
};

export const createData = (model: string, data: { [column: string]: any }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/test/seed`,
    body: {
      method: 'create',
      model,
      data,
    },
  }).then((res) => {
    return res.body;
  });
};

export const selectData = (
  model: string,
  where?: { [column: string]: any }
) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/test/seed`,
    body: {
      method: 'select',
      model,
      where,
    },
  }).then((res) => {
    return res.body;
  });
};

export const updateData = (
  model: string,
  where: { [column: string]: any },
  data: { [column: string]: any }
) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/test/seed`,
    body: {
      method: 'update',
      model,
      where,
      data,
    },
  });
};

export const deleteData = (
  model: string,
  where?: { [column: string]: any }
) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('NEXT_PUBLIC_API_URL')}/api/test/seed`,
    body: {
      method: 'delete',
      model,
      where,
    },
  });
};
