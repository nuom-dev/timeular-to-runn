import * as admin from 'firebase-admin';
// import * as functions from "firebase-functions";

export type UserRecord = admin.auth.UserRecord;

export class FirebaseAdmin {
  private static firestoreInstance: admin.firestore.Firestore;
  private static adminInstance: typeof admin;
  private static settings = { timestampsInSnapshots: true, ignoreUndefinedProperties: true };

  static firestore(): admin.firestore.Firestore {
    if (!FirebaseAdmin.firestoreInstance) {
      try {
        FirebaseAdmin.firestoreInstance = FirebaseAdmin.admin().firestore();
        FirebaseAdmin.firestoreInstance.settings(FirebaseAdmin.settings);
      } catch (err) {
        console.info('firebase already initialised');
      }
    }
    return FirebaseAdmin.firestoreInstance;
  }

  static auth(): admin.auth.Auth {
    return this.admin().auth();
  }

  static admin(): typeof admin {
    if (!FirebaseAdmin.adminInstance) {
      if (process.env.NODE_ENV === 'test') {
        const serviceAccount = require('../../../serviceAccountKey.json');
        process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
        process.env.FIREBASE_FIRESTORE_EMULATOR_ADDRESS = 'localhost:8080';
        process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
        try {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        } catch (err) {
          console.info('firebase already initialised');
        }
      } else {
        try {
          admin.initializeApp();
        } catch (err) {
          // console.error(err);
        }
      }
      FirebaseAdmin.adminInstance = admin;
    }
    return FirebaseAdmin.adminInstance;
  }

  static storage(): admin.storage.Storage {
    return FirebaseAdmin.admin().storage();
  }
}

export default FirebaseAdmin.admin;
