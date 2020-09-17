import schema from '@probro/common/src/schema';
import getBoardDetails from '../../../findBoradDetail';

export default async function getBoard(boardId) {
  const { session } = this;
  // console.log('get board api called', boardId);
  const getBoardRes = getBoardDetails(parseInt(boardId, 10));
  // console.log('get board res', getBoardRes);
  const {
    boardColumn,
    boardColumnCard,
    boardColumnCardAttachment,
    boardColumnCardComment,
    boardColumnCardDescription,
    boardColumnCardTag,
    boardMember,
  } = getBoardRes;

  session.dispatch(schema.add('BoardColumn', boardColumn));
  session.dispatch(schema.add('BoardColumnCard', boardColumnCard));
  session.dispatch(schema.add('BoardColumnCardAttachment', boardColumnCardAttachment));
  session.dispatch(schema.add('BoardColumnCardComment', boardColumnCardComment));
  session.dispatch(schema.add('BoardColumnCardDescription', boardColumnCardDescription));
  session.dispatch(schema.add('BoardColumnCardTag', boardColumnCardTag));
  session.dispatch(schema.add('BoardMember', boardMember));
  // session.dispatch(schema.init('BoardMessage', boardMessage));
  // session.dispatch(schema.init('BoardMessageSeenStatus', u.BoardMessageSeenStatus));

  return 'Data dispatch done';
}
