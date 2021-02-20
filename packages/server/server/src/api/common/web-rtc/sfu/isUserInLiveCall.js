import { liveBoard } from '../../../../cache';

export default function isUserInLiveCall(data) {
    try {
        const { boardId, userId } = data;
        if (boardId && userId) {
            return liveBoard.getUser(boardId, userId);
        }
    return null;
    } catch (e) {
        console.error('Error in isUserInLiveCall', e);
    }
}