import * as firebaseAdmin from 'firebase-admin';

// Initialize
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  });
  firebaseAdmin.firestore().settings({
    ignoreUndefinedProperties: true,
  });
}

const firebaseAdminAuth = firebaseAdmin.auth();

export { firebaseAdmin, firebaseAdminAuth };
