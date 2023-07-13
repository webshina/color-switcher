// import { LoginPage } from 'cypress/pages/LoginPage.cy';
// import { firebaseAuth } from 'cypress/support/firebase';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import nookies from 'nookies';

// export const _signInAdmin = async () => {
//   const userCredential = await signInWithEmailAndPassword(
//     firebaseAuth,
//     LoginPage.adminEmail,
//     LoginPage.adminPassword
//   );
//   const idToken = (await firebaseAuth.currentUser?.getIdToken()) ?? '';
//   nookies.set(undefined, 'firebaseIdToken', idToken, { path: '/' });
//   return userCredential;
// };

// export const signOutFirebaseAuth = () => {
//   cy.wrap(signOut(firebaseAuth));
// };

// export const initData = () => {
//   cy.wrap(_signInAdmin());
//   cy.request({
//     method: 'POST',
//     url: '/api/test/seed',
//     body: {
//       method: 'init',
//     },
//   });
// };

// export const createData = (model: string, data: { [column: string]: any }) => {
//   cy.wrap(_signInAdmin());
//   cy.request({
//     method: 'POST',
//     url: '/api/test/seed',
//     body: {
//       method: 'create',
//       model,
//       data,
//     },
//   }).then((res) => {
//     return res.body;
//   });
// };

// export const selectData = (
//   model: string,
//   where?: { [column: string]: any }
// ) => {
//   cy.wrap(_signInAdmin());
//   const res = cy
//     .request({
//       method: 'POST',
//       url: '/api/test/seed',
//       body: {
//         method: 'select',
//         model,
//         where,
//       },
//     })
//     .then((res) => {
//       return res.body;
//     });
// };

// export const updateData = (
//   model: string,
//   where: { [column: string]: any },
//   data: { [column: string]: any }
// ) => {
//   cy.wrap(_signInAdmin());
//   cy.request({
//     method: 'POST',
//     url: '/api/test/seed',
//     body: {
//       method: 'update',
//       model,
//       where,
//       data,
//     },
//   });
// };

// export const deleteData = (
//   model: string,
//   where?: { [column: string]: any }
// ) => {
//   cy.wrap(_signInAdmin());
//   cy.request({
//     method: 'POST',
//     url: '/api/test/seed',
//     body: {
//       method: 'delete',
//       model,
//       where,
//     },
//   });
// };

// export const deleteFirebaseUser = (email: string) => {
//   cy.wrap(_signInAdmin());
//   cy.request({
//     method: 'POST',
//     url: '/api/test/seed',
//     body: {
//       method: 'deleteFirebaseUser',
//       email,
//     },
//   });
// };
