import db from './db';
import { Handler } from './types';
import zod from 'zod';

const manufacturerParams = zod.object({
  id: zod.string(),
  year: zod.string().optional(),
});

export type ManufacturerParams = zod.infer<typeof manufacturerParams>;

export type ManufacturerResponse = Awaited<ReturnType<typeof db.manufacturer>>;

const manufacturer: Handler = async (req, res) => {
  const parseResult = manufacturerParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { id, year } = parseResult.data;

  const manufacturer = await db.manufacturer({ id, year });

  res.json(manufacturer);
};

export default manufacturer;
