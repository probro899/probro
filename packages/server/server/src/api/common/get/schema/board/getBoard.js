import schema from '@probro/common/src/schema';
import getBoardDetails from '../../../findBoradDetail';
import isUsersActiveStatus from '../../../../initializers/isUserActiveStatus';

export default async function getBoard(boardId) {
  try {
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

    const boardMemeberWithActiveStatus = isUsersActiveStatus(session.getChannel('Main'), boardMember);
 
    session.dispatch(schema.add('BoardColumn', boardColumn));
    session.dispatch(schema.add('BoardColumnCard', boardColumnCard));
    session.dispatch(schema.add('BoardColumnCardAttachment', boardColumnCardAttachment));
    session.dispatch(schema.add('BoardColumnCardComment', boardColumnCardComment));
    session.dispatch(schema.add('BoardColumnCardDescription', boardColumnCardDescription));
    session.dispatch(schema.add('BoardColumnCardTag', boardColumnCardTag));
    session.dispatch(schema.add('BoardMember', boardMemeberWithActiveStatus));
    return { api: 'getBoard', boardId, status: 200 };
  } catch (e) {
    console.error('Error in getBoard', e);
  }
}
