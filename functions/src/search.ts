import db from './db';
import { Handler } from './types';
import zod from 'zod';

const searchParams = zod.object({
  search: zod.string(),
});

export type SearchParams = zod.infer<typeof searchParams>;

export type SearchResponse = Awaited<ReturnType<typeof db.search>>;

const search: Handler = async (req, res) => {
  const parseResult = searchParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { search } = parseResult.data;

  const results = await db.search(search);

  res.json(results);
};

export default search;
