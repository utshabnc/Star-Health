import { withAuth } from './auth';
import db from './db';
import { HandlerWithAuth } from './types';
import zod from 'zod';

const reviewParams = zod.object({
  doctorId: zod.string(),
  rating: zod.number().int().min(0).max(5),
  text: zod.string(),
});

export type AddReviewParams = zod.infer<typeof reviewParams>;

export type AddReviewResponse = Awaited<typeof db.addReview>;

const addReview: HandlerWithAuth = async (req, res) => {
  const parseResult = reviewParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { doctorId, rating, text } = parseResult.data;
  
  const review = await db.addReview({
    doctorId,
    rating,
    text,
    createdBy: req.uid,
  });

  res.json(review);
};

export default withAuth(addReview);
