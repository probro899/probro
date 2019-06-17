import React from 'react';
import { Button, Intent, Tooltip } from '@blueprintjs/core';
import client from '../../../../socket';
import main from '../../../../webrtc/main';

class Index extends React.Component {
  state={ apis: null, pc: null, offers: [], answers: [], callType: null, recording: null, chat: null, microphone: null };

  async componentWillMount() {
    const apisRes = await client.scope('Mentee');
    this.setState({ apis: apisRes });
    await this.socketEventListner();
  }

  socketEventListner = async () => {
    const pcMain = await main(this.onIceCandidateHandler);
    this.setState({ pc: pcMain });
    const { pc, apis } = this.state;
    client.on('offer', async (data) => {
      console.log('Offer arrived', data);
      const { answers } = this.state;
      const { offer, userId } = data;
      this.setState({ answers: [...answers, { userId }] });
      const answer = await pc.createAnswer(offer, 'video');
      apis.createAnswer([answer, [{ userId: 2 }]]);
    });

    client.on('answer', (data) => {
      console.log('answer arrived', data);
      pc.setRemoteDescription(data);
    });

    client.on('icecandidate', (data) => {
      console.log('icecandidate Arrived', data);
      pc.addCandidate(data);
    });
  }

  onIceCandidateHandler = async (e) => {
    console.log('ice candidate called', e);
    const { apis, offers, answers } = this.state;
    const offer = offers.length !== 0;
    try {
      await apis.addIceCandidate([JSON.stringify(e.candidate), offer ? offers : answers]);
    } catch (err) {
      console.error('Error in add local iCe candidate', err);
    }
  }

  _callHandler = async (apis, callType) => {
    console.log('call handler called', apis);
    this.setState({ callType });
    const { pc, offers } = this.state;
    this.setState({ offers: [...offers, { userId: 3 }] });
    const offer = await pc.createOffer(callType);
    apis.createOffer([{ offer, userId: 2 }, [{ userId: 3 }]]);
  }

  render() {
    const { apis, callType } = this.state;
    return (
      <div style={{ marginTop: 100, marginLeft: 100 }}>
        {/* eslint-disable-next-line */}
        <video controls id="video1" playsInline autoPlay style={{ height: 300, width: 400, background: 'black'}} />
        <div style={{ marginTop: 5 }}>
          <Tooltip content="Audio Call" position="top">
            <Button onClick={() => this._callHandler(apis, 'audio')} text="" style={{ marginLeft: 10 }} icon="phone" intent={(callType === 'audio' || callType === 'video') ? Intent.DANGER : Intent.SUCCESS} />
          </Tooltip>
          <Tooltip content="Video Call" position="top">
            <Button onClick={() => this._callHandler(apis, 'video')} text="" style={{ marginLeft: 10 }} icon="mobile-video" intent={Intent.SUCCESS} />
          </Tooltip>
          <Tooltip content="Screen Sharing" position="top">
            <Button onClick={() => this._callHandler(apis, 'screenshare')} text="" style={{ marginLeft: 10 }} icon="duplicate" intent={Intent.SUCCESS} />
          </Tooltip>
          <Tooltip content="Chatting" position="top">
            <Button onClick={() => this._callHandler(apis, 'chat')} text="" style={{ marginLeft: 10 }} icon="chat" intent={Intent.SUCCESS} />
          </Tooltip>
          <Tooltip content="Recording" position="top">
            <Button onClick={() => this._callHandler(apis)} text="" style={{ marginLeft: 10 }} icon="record" intent={Intent.SUCCESS} />
          </Tooltip>
          <Tooltip content="Microphone" position="top">
            <Button onClick={() => this._callHandler(apis)} text="" style={{ marginLeft: 10 }} icon="headset" intent={Intent.SUCCESS} />
          </Tooltip>

        </div>
      </div>
    );
  }
}
export default Index;
