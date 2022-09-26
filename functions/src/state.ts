import db from './db';
import { Handler } from './types';
import zod from 'zod';

const stateParams = zod.object({
  id: zod.string(),
  year: zod.string().optional(),
  drugType: zod.string().optional(),
});

export type StateParams = zod.infer<typeof stateParams>;

export type StateResponse = Awaited<ReturnType<typeof db.state>>;

const state: Handler = async (req, res) => {
  const parseResult = stateParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { id, year, drugType } = parseResult.data;

  const state = await db.state({ id, year, drugType });

  res.json(state);
};

export default state;
