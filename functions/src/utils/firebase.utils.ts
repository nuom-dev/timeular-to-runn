import {initializeApp} from "firebase-admin";
import {logger} from "firebase-functions";

export function initFirebase() {
  try {
    initializeApp();
  } catch (e) {
    logger.log('Firebase initialization failed: ' + e);
  }
}
