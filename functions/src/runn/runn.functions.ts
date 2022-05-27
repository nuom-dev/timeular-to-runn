import {regionalFunctions} from "../utils/functions.utils";
import { addActualTimeEntry, getRunnPersonByEmail, getRunnProjects, getRunnRoles} from "./runn.utils";
import {initFirebase} from "../utils/firebase.utils";
import { getFirestore } from'firebase-admin/firestore';
import {USERS_COLLECTION} from "../constants";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;
import {https, logger} from "firebase-functions";

export const getProjects = regionalFunctions.https
  .onCall(async (data, context) => {
    return getRunnProjects();
  })

export const getRoles = regionalFunctions.https
  .onCall(async (data, context) => {
    return getRunnRoles();
  })

export const getUser = regionalFunctions.https.onCall(async (data: {email: string}, context) => {
  return getRunnPersonByEmail(data.email);
})

export const setPersonId = regionalFunctions.https.onCall(async (data: { email: string }, context) => {
  const uid = context.auth?.uid;
  if(!uid) return
  const person = await getRunnPersonByEmail(data.email);

  if (!person) return;

  initFirebase();
  const db = getFirestore();
  await db.collection('users').doc(uid).update({
    'runn.personId': person.id
  })
})

export const addEntry = regionalFunctions.https.onCall(async (data: {minutes: number, date: string, projectId: string, runnId: string, roleId: string, entryId: string }, context) => {
  const uid = context.auth?.uid;
  if(!uid) return

  try {

    const response = addActualTimeEntry({
      date: new Date(data.date),
      minutes: data.minutes,
      personId: data.runnId,
      projectId: data.projectId,
      roleId: data.roleId,
    })

    initFirebase();
    const db = getFirestore();
    await db.collection(USERS_COLLECTION).doc(uid).collection('savedEntries').doc(data.entryId).set({
      ...data,
      savedDate: FieldValue.serverTimestamp()
    })

    return response;
  }catch (e) {
    logger.error(e)
    throw new https.HttpsError('unknown', e.message)
  }
})
