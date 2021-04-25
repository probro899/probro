/* eslint-disable import/no-cycle */
import databaseCache from '../../../../../cache/database/cache';
import flat from '../../../../flat';

export default function getCard(record) {
  try {
    const { boardId } = record;
    return flat(databaseCache.get('BoardColumn').filter(bc => bc.boardId === boardId).map(obj => databaseCache.get('BoardColumnCard').filter(bcc => bcc.boardColumnId === obj.id))).map(obj => ({ id: obj.id, name: obj.name, boardColumnId: obj.boardColumnId }));
  } catch (e) {
    console.error('Error in getCard', e);
  }
}
