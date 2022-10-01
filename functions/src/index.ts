import * as functions from 'firebase-functions';
import doctorHandler from './doctor';
import manufacturerHandler from './manufacturer';
import stateHandler from "./state";
import allStatesHandler from "./allStates";
import addReviewHandler from './addReview';
import searchHandler from './search';

import { Handler, HandlerWithAuth } from './types';
// import cloudSqlDb from './cloudSqlDb';
// export const scheduledDbStart = functions.pubsub.schedule('every day 06:00').timeZone('America/New_York').onRun(cloudSqlDb.start);
// export const scheduledDbStop = functions.pubsub.schedule('every day 20:00').timeZone('America/New_York').onRun(cloudSqlDb.stop);


process.env.DATABASE_URL = functions.config().prisma.db;

// Necessary to allow dev web app to access the prod functions
const withCors =
  (handler: Handler | HandlerWithAuth) =>
  async (req: functions.Request, res: functions.Response) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', ['GET', 'POST']);
      res.set('Access-Control-Allow-Headers', [
        'Content-Type',
        'Authorization',
      ]);
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
      handler(req as any, res);
    }
  };

export const doctor = functions.https.onRequest(withCors(doctorHandler));
export const manufacturer = functions.https.onRequest(withCors(manufacturerHandler));
export const state = functions.https.onRequest(withCors(stateHandler));
export const allStates = functions.https.onRequest(withCors(allStatesHandler));
export const search = functions.https.onRequest(withCors(searchHandler));
export const addReview = functions.https.onRequest(withCors(addReviewHandler));

