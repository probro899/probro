import React from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import adapter from 'webrtc-adapter';
import Janus from '../janus';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.sfuTest = null;
    this.opaqueId = "videoroomtest-"+Janus.randomString(12);
    this.myroom = 1234;	// Demo room
    this.myusername = null;
    this.myid = null;
    this.mystream = null;
    // We use this other ID just to map our subscriptions to us
    this.mypvtid = null;
    this.feeds = [];
    this.state = { isJanusConnected: false };
  }


  inputHandler = (e) => {
    this.setState({ displayName: e.target.value });
  }

  render() {
    return (
      <div>
        <InputGroup onChange={this.inputHandler} placeholder="enter your display name" />
        <Button intent="success" style={{ margin: 10 }} text="Join" onClick={this.joinHandler} />
      </div>
    );
  }
}
export default Index;
