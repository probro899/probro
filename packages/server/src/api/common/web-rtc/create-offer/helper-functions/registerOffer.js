/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';

export default (offerDetail, userId) => {
  const { broadCastId, uid } = offerDetail;
  const { offer } = liveBoard.getPc(broadCastId, userId, uid);
  if (!offer) {
    // setting fuser is making offer to tuser
    liveBoard.updatePc(broadCastId, uid, userId, { offer: true, callClose: false });
  }

  console.log(`${userId})REGISTER OFFER`, liveBoard.getBoard(broadCastId));
};
