import { Request, Response } from 'firebase-functions';

export type Handler = (req: Request, res: Response) => void | Promise<void>;

export type HandlerWithAuth = (
  req: Request & { uid: string },
  res: Response
) => void | Promise<void>;
