import { regionalFunctions } from '../utils/functions.utils';
import {
  entriesBetweenDates,
  getApiKeys,
  listActivities,
  timeularSignIn,
} from './timeular.utils';
import { https } from 'firebase-functions';

export const getActivities = regionalFunctions.https.onCall(
  async (data, context) => {
    const userId = context.auth?.uid;

    if (!userId) {
      throw new https.HttpsError(
        'unauthenticated',
        'User is not authenticated'
      );
    }

    const { apiKey, apiSecret } = await getApiKeys(userId);
    const token = await timeularSignIn(apiKey, apiSecret);

    return listActivities(token);
  }
);

export const getEntries = regionalFunctions.https.onCall(
  async (data: { startDate: Date; endDate: Date }, context) => {
    const userId = context.auth?.uid;

    if (!userId) {
      throw new https.HttpsError(
        'unauthenticated',
        'User is not authenticated'
      );
    }

    const { apiKey, apiSecret } = await getApiKeys(userId);
    const token = await timeularSignIn(apiKey, apiSecret);

    let { startDate, endDate } = data;

    if (typeof startDate === 'string') {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
    }

    return entriesBetweenDates(token, startDate, endDate);
  }
);
