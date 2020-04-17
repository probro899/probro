/* eslint-disable import/no-cycle */
import schema from '@probro/common/source/src/schema';
import updateUserCache from '../../updateUserCache';
import { database, liveBoard } from '../../../../cache';
import registerUser from './helper-functions/registerUser';
import socketCloseListner from './helper-functions/socketCloseListner';
import registerOffer from './helper-functions/registerOffer';

export default (session, data) => {
  const { offerDetail } = data;

  // Checking either do offer or not
  const doOffer = registerUser(offerDetail, data.userList[0].userId);

  if (doOffer) {
    const allBoardUserSession = session.getChannel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    const liveBoardChannelBefore = session.getChannel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

    if (!liveBoardChannelBefore) {

      // console.log('Offer Lelel 1');
      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      const allLiveSessions = session.getChannel(`Board-${offerDetail.broadCastId}`);

      allLiveSessions.forEach(s => updateUserCache({ Board: { id: offerDetail.broadCastId, activeStatus: offerDetail.uid } }, s, 'update'));

      // udpate active status true in cache database
      database.update('Board', schema.update('Board', { id: offerDetail.broadCastId, activeStatus: offerDetail.uid }));

      // update live Board to isLive value to current calling user
      // liveBoard.setBoard(offerDetail.broadCastId, { ...liveBoard.getBoard(offerDetail.broadCastId), isLive: offerDetail.uid });

      // add socket Close listner
      allBoardUserSession.forEach(s => s.addCloseListener(socketCloseListner(session, offerDetail.broadCastId, s.values.user.id)));

      // Regiter Offer in cache
      registerOffer(offerDetail, data.userList[0].userId);

    } else if (liveBoardChannelBefore.length <= 1) {
      // console.log('Offer Level 2');
      // console.log('inside one session board');
      liveBoardChannelBefore.forEach(s => s.unsubscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      allBoardUserSession.forEach(s => s.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`));

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      // Regiter Offer in cache
      registerOffer(offerDetail, data.userList[0].userId);

    } else {
      // console.log('Offer Level 3');
      session.subscribe(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      const liveBoardChannel = session.channel(`${offerDetail.broadCastType}-live-${offerDetail.broadCastId}`);

      if (offerDetail.isLive) {
        const allLiveSessions = session.getChannel(`Board-${offerDetail.broadCastId}`);

        allLiveSessions.forEach(s => updateUserCache({ Board: { id: offerDetail.broadCastId, activeStatus: offerDetail.uid } }, s, 'update'));

        // liveBoard.setBoard(offerDetail.broadCastId, { ...liveBoard.getBoard(offerDetail.broadCastId), isLive: offerDetail.uid });

        database.update('Board', schema.update('Board', { id: offerDetail.broadCastId, activeStatus: offerDetail.uid }));
      }

      liveBoardChannel.emit('offer', data.offerDetail, data.userList);

      // Regiter Offer in cache
      registerOffer(offerDetail, data.userList[0].userId);
    }
  }
};
