import * as admin from 'firebase-admin';
import { Request, Response } from 'firebase-functions';
import { HandlerWithAuth } from './types';

admin.initializeApp();

export const withAuth =
  (handler: HandlerWithAuth) =>
  async (req: Request & { uid: string }, res: Response) => {
    const token = await verifyToken(req);

    if (token == null) {
      res.sendStatus(400);
      return;
    }

    req.uid = token.uid;
    return handler(req, res);
  };

const verifyToken = async (request: Request) => {
  try {
    const token = getToken(request);

    if (!token) {
      return null;
    }

    const payload = await admin.auth().verifyIdToken(token);

    return payload;
  } catch (err) {
    console.log({ err });
    return null;
  }
};

const getToken = (request: Request) => {
  if (!request.headers.authorization) {
    return undefined;
  }

  const token = request.headers.authorization.replace(/^Bearer\s/, '');

  return token;
};
