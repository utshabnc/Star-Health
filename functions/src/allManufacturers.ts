import db from './db';
import { Handler } from './types';
import zod from 'zod';

const allManufacturersParams = zod.object({
});

export type AllManufacturersParams = zod.infer<typeof allManufacturersParams>;
export type AllManufacturersResponse = Awaited<ReturnType<typeof db.allManufacturers>>;

const allManufacturers: Handler = async (req, res) => {
  const parseResult = allManufacturersParams.safeParse(req.body);

  if (!parseResult.success) {	
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

	const result  = parseResult.data;

  const allManufacturers = await db.allManufacturers(result);

  res.json(allManufacturers);
};

export default allManufacturers;
