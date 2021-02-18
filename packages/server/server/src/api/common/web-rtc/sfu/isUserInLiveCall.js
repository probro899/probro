import { liveBoard } from '../../../../cache';

export default function isUserInLiveCall(data) {
    const { boardId, userId } = data;
    if (boardId && userId) {
        return liveBoard.getUser(boardId, userId);
    }
    return null;
}