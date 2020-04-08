/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';

export default async function onPcStatusChange({ boardId, userId, pcId, status }) {
  const pc = liveBoard.getPc(boardId, userId, pcId);
  // check if satatus is connected then put start time
  if (status === 'connected' && !pc.startTime) {
    liveBoard.updatePc(boardId, userId, pcId, { ...pc, status, startTime: Date.now() });
  } else {
    liveBoard.updatePc(boardId, userId, pcId, { ...pc, status });
  }
  // console.log('Board after status change', liveBoard.getBoard(boardId));
}
