import db from './db';
import { Handler } from './types';
import zod from 'zod';

const doctorParams = zod.object({
  id: zod.string(),
  year: zod.string().optional(),
});

export type DoctorParams = zod.infer<typeof doctorParams>;

export type DoctorResponse = Awaited<ReturnType<typeof db.doctor>>;

const doctor: Handler = async (req, res) => {
  const parseResult = doctorParams.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: 'Invalid parameters',
    });
    return;
  }

  const { id, year } = parseResult.data;

  const doctor = await db.doctor({ id, year });

  res.json(doctor);
};

export default doctor;
