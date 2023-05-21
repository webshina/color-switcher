import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = Cypress.env('firebase');

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const firebase = getApp();

export default firebase;
export const firebaseAuth = getAuth(getApp());
