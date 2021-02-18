import { connect } from 'react-redux';
import React from 'react';
import EchoTest from './echo-test';
import VideoCall from './videoCall';
import VideoConference from './videoConference';
import Streaming from './streaming';

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
      case 'streaming':
        return <Streaming {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <button style={{ margin: 10, backgroundColor: 'green' }} text="Echo server" onClick={() => this.setState({ currentTest: 'echo' })} />
          <button style={{ margin: 10, backgroundColor: 'green' }} text="Video Call" onClick={() => this.setState({ currentTest: 'videoCall' })} />
          <button style={{ margin: 10, backgroundColor: 'green' }} text="Video Conference" onClick={() => this.setState({ currentTest: 'videoConference' })} />
          <button style={{ margin: 10, backgroundColor: 'green' }} text="Streaming" onClick={() => this.setState({ currentTest: 'streaming' })} />
        </div>
        {this.renderTest()}
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Index);
