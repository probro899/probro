import { connect } from 'react-redux';
import React from 'react';
import EchoTest from './echo-test';
import VideoCall from './videoCall';
import VideoConference from './videoConference';
import Streaming from './streaming';
import ApiTest from './api-test';
import Vimeo from '../vimeo';

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
      case 'apiTest':
        return <ApiTest {...this.props} />;
      case 'vimeo':
        return <Vimeo {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    console.log('props in test', this.props);
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} text="Echo server" onClick={() => this.setState({ currentTest: 'echo' })} >Echo server</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} text="Video Call" onClick={() => this.setState({ currentTest: 'videoCall' })}>Video Call</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} text="Video Conference" onClick={() => this.setState({ currentTest: 'videoConference' })} >Video Conference</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} text="Streaming" onClick={() => this.setState({ currentTest: 'streaming' })}>Streaming</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} text="Streaming" onClick={() => this.setState({ currentTest: 'streaming' })}>Streaming</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} onClick={() => this.setState({ currentTest: 'apiTest'})}>Api Test</button>
          <button style={{ margin: 10, backgroundColor: 'green', color: 'white' }} onClick={() => this.setState({ currentTest: 'vimeo'})}>Vimeo Test</button>
        </div>
        {this.renderTest()}
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Index);
