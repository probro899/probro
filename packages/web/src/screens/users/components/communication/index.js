import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';
import Sound from 'react-sound';
import ringtone from '../../../../assets/ringtone.mp3';
import * as actions from '../../../../actions';
import client from '../../../../socket';
import main from '../../../../webrtc/main';
import MenuBar from './components/menuBar';
import Content from './components/content';
import Media from './components/content/media';
import IncommingCall from './components/incomming-call';

class Index extends React.Component {
  state = {
    apis: null,
    callType: null,
    windowHeight: window.innerHeight * 0.85,
    windowWidth: window.innerWidth * 0.85,
  };

  async componentWillMount() {
    const apisRes = await client.scope('Mentee');
    this.setState({ apis: apisRes });
    await this.socketEventListner();
    // console.log('state data', this.state);
  }

  createPcForeachUser = async (boardId) => {
    try {
      const { database, updateWebRtc, account } = this.props;
      const boardmembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === boardId);
      const userListAll = boardmembers.map(bm => database.User.byId[bm.tuserId]);
      const userList = userListAll.filter(user => user.id !== account.user.id);
      const peerConnectionPromises = userList.map(user => main(this.onIceCandidateHandler, user.id));
      const peerConnList = await Promise.all(peerConnectionPromises);
      const storeValue = userList.reduce((obj, user, idx) => {
        obj[user.id] = { pc: peerConnList[idx], user };
        return obj;
      }, {});
      updateWebRtc('peerConnections', storeValue);
      return userList;
    } catch (e) {
      console.error('Error in creating pc', e);
    }
  }

  socketEventListner = async () => {
    // Handle offer request
    client.on('offer', async (data) => {
      console.log('Offer arrived', data);
      const { updateWebRtc, account, webRtc } = this.props;
      const { apis } = this.state;
      if (webRtc.showCommunication) {
        const { offer, uid, boardId } = data;
        updateWebRtc('currentOffer', data);
        updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);
        updateWebRtc('liveIncomingCall', true);
      } else {
        updateWebRtc('showIncommingCall', true);
        updateWebRtc('currentOffer', data);
        updateWebRtc('pendingOffers', [...webRtc.pendingOffers, data]);
      }
    });

    // Handling incoming answer
    client.on('answer', async (data) => {
      console.log('answer arrived', data);
      const { apis } = this.state;
      const { webRtc, account, updateWebRtc } = this.props;
      const { uid, answer, boardId } = data;
      const { pc } = webRtc.peerConnections[uid];
      const iceCandidate = webRtc.iceCandidates[uid];
      if (data) {
        pc.setRemoteDescription(answer);
        await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(iceCandidate.e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId: uid }] });
        updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
      }
    });

    // Handling incoming iceCandidate
    client.on('icecandidate', async (data) => {
      console.log('icecandidate Arrived', data);
      const { apis } = this.state;
      const { uid, iceCandidate } = data;
      const { webRtc, account, updateWebRtc } = this.props;
      const { pc } = webRtc.peerConnections[uid];
      const iceCand = webRtc.iceCandidates[uid];
      if (iceCandidate) {
        pc.addCandidate(iceCandidate);
        if (!iceCand) {
          updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { preFetch: true } });
        } else if (!iceCand.sendStatus) {
          await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(iceCand.e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId: uid }] });
          updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [uid]: { ...webRtc.iceCandidates[uid], sendStatus: true } });
        }
      }
    });
  }

  answerHandler = async (apis, callType) => {
    // console.log('answer handler called', callType);
    try {
      let { webRtc } = this.props;
      const { account, updateWebRtc } = this.props;
      const { boardId } = webRtc.currentOffer;
      updateWebRtc('liveIncomingCall', false);
      await this.createPcForeachUser(boardId);
      // eslint-disable-next-line
      webRtc = this.props.webRtc;
      updateWebRtc('outGoingCallType', callType);
      updateWebRtc('showIncommingCall', false);
      updateWebRtc('showCommunication', boardId);
      updateWebRtc('communicationContainer', 'connecting');
      const previousOffers = webRtc.pendingOffers;
      // console.log('pending offers', previousOffers);
      const pcs = Object.values(webRtc.peerConnections);
      // console.log('all pcs in store', pcs);
      const remainingUserPcs = pcs.filter(p => previousOffers.find(ofr => ofr.uid === p.user.id));
      // console.log('remainingUserPcs', remainingUserPcs);
      const answerPromises = remainingUserPcs.map(p => p.pc.createAnswer(previousOffers.find(ofr => ofr.uid === p.user.id).offer, callType));
      const anserList = await Promise.all(answerPromises);
      // console.log('answer list', anserList);
      anserList.forEach((answer, idx) => apis.createAnswer({ answerDetail: { answer, uid: account.user.id, boardId }, userList: [{ userId: remainingUserPcs[idx].user.id }] }));
      const previousOffer = webRtc.pendingOffers;
      // console.log('previousOffer for offer test', previousOffer);
      const pc = Object.values(webRtc.peerConnections);
      // console.log('pc in offer test', pc);
      const remainingUser = pc.filter(p => !previousOffer.find(ofr => ofr.uid === p.user.id));
      // console.log('remaininguser for offer test', remainingUser);
      const pcsPromises = remainingUser.map(p => p.pc.createOffer(callType));
      const allOffers = await Promise.all(pcsPromises);
      // console.log('all offers', allOffers);
      allOffers.forEach((offr, idx) => apis.createOffer({ offerDetail: { offer: offr, uid: account.user.id, boardId: 1 }, userList: [{ userId: remainingUser[idx].user.id }] }));
    } catch (e) {
      console.error('error in create answer', e);
    }
  };

  onIceCandidateHandler = async (e, userId) => {
    console.log('ice candidate called', e, userId);
    const { account, webRtc, updateWebRtc } = this.props;
    const { apis } = this.state;
    try {
      if (e.candidate) {
        const preFetchStatus = webRtc.iceCandidates[userId];
        if (!preFetchStatus) {
          updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: false, preFetch: false } });
        } else if (preFetchStatus.preFetch) {
          updateWebRtc('iceCandidates', { ...webRtc.iceCandidates, [userId]: { e, sendStatus: true, preFetch: false } });
          await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId }] });
        }
        // await apis.addIceCandidate({ iceCandidateDetail: { iceCandidate: JSON.stringify(e.candidate), uid: account.user.id, boardId: webRtc.currentOffer ? webRtc.currentOffer.boardId : webRtc.showCommunication }, userList: [{ userId }] });
      }
    } catch (err) {
      console.error('Error in add local iCe candidate', err);
    }
  }

  callHandler = async (apis, callType) => {
    let { webRtc } = this.props;
    const { updateWebRtc, account } = this.props;
    await this.createPcForeachUser(webRtc.showCommunication);
    // eslint-disable-next-line
    webRtc = this.props.webRtc;
    updateWebRtc('communicationContainer', 'connecting');
    const pcs = Object.values(webRtc.peerConnections);
    const users = Object.keys(webRtc.peerConnections);
    const pcsPromises = pcs.map(pc => pc.pc.createOffer(callType));
    const allOffers = await Promise.all(pcsPromises);
    allOffers.forEach((offer, idx) => apis.createOffer({ offerDetail: { offer, uid: account.user.id, boardId: webRtc.showCommunication }, userList: [{ userId: parseInt(users[idx], 10) }] }));
  }

  render() {
    const { apis, callType, windowHeight, windowWidth } = this.state;
    const { webRtc } = this.props;
    return (
      <div>
        {webRtc.liveIncomingCall && <Sound url={ringtone} playStatus={Sound.status.PLAYING} playFromPosition={0} loop /> }
        <Dialog isOpen={webRtc.showCommunication || webRtc.communicationContainer === 'connecting'} style={{ width: 'auto', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: windowHeight, width: windowWidth }}>
            <div>
              <MenuBar {...this.props} />
              <Content {...this.props} callType={callType} apis={apis} _callHandler={this.callHandler} answerHandler={this.answerHandler} />
            </div>
          </div>
        </Dialog>
        <Dialog isOpen={webRtc.showIncommingCall} style={{ zIndex: 12, height: 'auto', width: 'auto', padding: 0 }}>
          <div style={{ border: 'solid', borderWidth: 1, borderColor: 'white', borderRadius: 5 }}>
            {/* <MenuBar {...this.props} /> */}
            <IncommingCall {...this.props} answerHandler={this.answerHandler} apis={apis} />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Index);

Index.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
