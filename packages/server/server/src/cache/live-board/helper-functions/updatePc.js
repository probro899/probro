import setPc from './setPc';
import getPc from './getPC';

export default (boardId, userId, pcId, payload) => {
  const pc = getPc(boardId, userId, pcId);
  setPc(boardId, userId, pcId, { ...pc, ...payload });
};
