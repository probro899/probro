import db from '../../../../../db';
import findUserDetails from '../../../findUserDetails';

export default async function getCardActivity(record) {
  const { cardId } = record;
  const res = await db.execute(async ({ find }) => {
    const cardActivities = await find('BoardActivity', { cardId });
    const cardActivitiesWithUser = cardActivities.map(c => ({ ...c, user: findUserDetails(c.userId) }));
    return { cardActivities: cardActivitiesWithUser };
  });
  return res;
}
