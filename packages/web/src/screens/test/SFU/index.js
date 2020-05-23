import React from 'react';
import { Button } from '@blueprintjs/core';
import EchoTest from './echo-test';
import VideoCall from './videoCall';
import VideoConference from './videoConference';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTest: null };
  }

  renderTest = () => {
    const { currentTest } = this.state;
    switch (currentTest) {
      case 'echo':
        return <EchoTest />;
      case 'videoCall':
        return <VideoCall />;
      case 'videoConference':
        return <VideoConference />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <Button style={{ margin: 10 }} intent="success" text="Echo server" onClick={() => this.setState({ currentTest: 'echo' })} />
          <Button style={{ margin: 10 }} intent="success" text="Video Call" onClick={() => this.setState({ currentTest: 'videoCall' })} />
          <Button style={{ margin: 10 }} intent="success" text="Video Conference" onClick={() => this.setState({ currentTest: 'videoConference' })} />
        </div>
        {this.renderTest()}
      </div>
    );
  }
}
export default Index;
