/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';

export default (iceCandidateDetails, userId) => {
  const { broadCastId, uid } = iceCandidateDetails;
  const isClose = liveBoard.getPc(broadCastId, userId, uid).callClose;
  return isClose;
};
