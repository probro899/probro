import db from '../../db';

export default async (req, res) => {
  const record = req.body;
  console.log('Admin user update caleld', record);
  const { type } = record;
  const result = await db.execute(async ({ update }) => {
    const upRes = await update('User', { type }, { id: record.id });
    return upRes;
  });
  res.sendStatus(200);
  res.send(JSON.stringify(result));
};
