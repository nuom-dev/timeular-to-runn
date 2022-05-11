import {logger} from "firebase-functions";
import {regionalFunctions} from "../utils/functions.utils";
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from'firebase-admin/firestore';
import {USERS_COLLECTION} from "../constants";
import {createNewUser} from "../users/users.utils";
import * as functions from 'firebase-functions';


initializeApp();
const db = getFirestore();

export const onUserRegisters = regionalFunctions.auth.user().onCreate(async (user) => {

  logger.debug('user created', user.email, user.uid);

  if(!user.email || !user.uid) {
    throw new functions.https.HttpsError('invalid-argument', 'User must have an email and uid');
    return
  }

  const userData = await createNewUser(user.email)

  await db.collection(USERS_COLLECTION).doc(user.uid).set(userData);
});
