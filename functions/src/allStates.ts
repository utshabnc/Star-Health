import db from './db';
import { Handler } from './types';
import zod from 'zod';

const allStatesParams = zod.object({
  drugType: zod.string().optional(),
});

export type AllStatesParams = zod.infer<typeof allStatesParams>;
export type AllStatesResponse = Awaited<ReturnType<typeof db.allStates>>;

const allStates: Handler = async (req, res) => {
  const parseResult = allStatesParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { drugType } = parseResult.data;

  const allStates = await db.allStates({ drugType });

  res.json(allStates);
};

export default allStates;
