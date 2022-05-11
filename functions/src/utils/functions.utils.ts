import * as firebaseFunctions from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export const regionalFunctions = firebaseFunctions.region('europe-west2');

export enum ChangeType {
  CREATE,
  DELETE,
  UPDATE,
}

export const getChangeType = (change: firebaseFunctions.Change<DocumentSnapshot>) => {
  if (!change.after.exists) {
    return ChangeType.DELETE;
  }
  if (!change.before.exists) {
    return ChangeType.CREATE;
  }
  return ChangeType.UPDATE;
};

/**
 * Returns the value of a nested property of an object.
 * @param data
 * @param field
 */
export function getDataFromField(data: any, field: string): any {
  if (!data) {
    return null;
  }
  if (field.indexOf('.') === -1) {
    return data[field];
  }
  const fields = field.split('.');
  let result = data;
  for (let i = 0; i < fields.length; i++) {
    // logger.log({ resultBefore: result });
    result = result[fields[i]];
    // logger.log({ resultAfter: result });
    if (!result) {
      return null;
    }
  }
  return result;
}
