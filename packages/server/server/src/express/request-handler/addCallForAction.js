import databaseCache from '../../cache/database/cache';
import add from '../../api/common/create/add';

export default async (req, res) => {
  try {
    const record = req.body;
    const hasCalled = databaseCache.get('CallForAction').find(c => c.email === record.email);
    if (hasCalled) {
      res.status(201);
      res.send('You all ready called for action');
    } else {
      const resFinal = await add('CallForAction', { ...record, createdAt: Date.now() });
      if (resFinal) {
        res.status(200);
        res.send(JSON.stringify(resFinal));
      }
    }
  } catch (e) {
    console.log('error in request handler  verify token', e.message);
    res.status(501).send({ status: 501, message: e.message });
  }
};
