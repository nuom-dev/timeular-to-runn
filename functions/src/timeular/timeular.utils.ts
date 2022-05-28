import axios from 'axios';
import { DateTime } from 'luxon';
import { logger, https } from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { USERS_COLLECTION } from '../constants';
import { User } from '../users/user.model';
import { initFirebase } from '../utils/firebase.utils';

const timeularendpoint = 'https://api.timeular.com/api/v3/';

export async function getApiKeys(
  userId: string
): Promise<{ apiKey: string; apiSecret: string }> {
  initFirebase();
  const db = getFirestore();
  const user = await db.collection(USERS_COLLECTION).doc(userId).get();
  if (!user.exists) {
    throw new https.HttpsError('not-found', 'User not found');
  }
  const userData = user.data() as User;
  return {
    apiKey: userData.timeular?.apiKey ?? '',
    apiSecret: userData.timeular?.apiSecret ?? '',
  };
}

export async function timeularSignIn(
  apiKey: string,
  apiSecret: string
): Promise<string> {
  const response = await axios.post(timeularendpoint + 'developer/sign-in', {
    apiKey,
    apiSecret,
  });

  return response.data.token;
}

export async function listActivities(token: string) {
  try {
    const response = await axios.get(timeularendpoint + 'activities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

export async function entriesSinceDate(token: string, startDate: Date) {
  const start = DateTime.fromMillis(startDate.getTime()).toISO().split('+')[0];
  const end = DateTime.fromMillis(Date.now())
    .endOf('week')
    .toISO()
    .split('+')[0];

  console.log(`start ${start}, end ${end}`);
  const timeframe = `${start}/${end}`;
  const response = await axios.get(
    timeularendpoint + 'time-entries' + '/' + timeframe,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function entriesBetweenDates(
  token: string,
  startDate: Date,
  endDate: Date
) {
  logger.log({ startDate, endDate });
  const start = DateTime.fromMillis(startDate.getTime())
    .startOf('day')
    .toISO()
    .split('+')[0];
  const end = DateTime.fromMillis(endDate.getTime())
    .endOf('day')
    .toISO()
    .split('+')[0];

  console.log(`start ${start}, end ${end}`);
  const timeframe = `${start}/${end}`;
  try {
    const response = await axios.get(
      timeularendpoint + 'time-entries' + '/' + timeframe,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    logger.error(err);
  }
}

export async function weeklyEntries(token: string) {
  const start = DateTime.fromMillis(Date.now())
    .startOf('week')
    .toISO()
    .split('+')[0];
  const end = DateTime.fromMillis(Date.now())
    .endOf('week')
    .toISO()
    .split('+')[0];

  console.log(`start ${start}, end ${end}`);
  const timeframe = `${start}/${end}`;
  const response = await axios.get(
    timeularendpoint + 'time-entries' + '/' + timeframe,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function previousWeekEntries(token: string) {
  const start = DateTime.fromMillis(Date.now())
    .minus({ days: 7 })
    .startOf('week')
    .toISO()
    .split('+')[0];
  const end = DateTime.fromMillis(Date.now())
    .minus({ days: 7 })
    .endOf('week')
    .toISO()
    .split('+')[0];

  console.log(`start ${start}, end ${end}`);
  const timeframe = `${start}/${end}`;
  const response = await axios.get(
    timeularendpoint + 'time-entries' + '/' + timeframe,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
