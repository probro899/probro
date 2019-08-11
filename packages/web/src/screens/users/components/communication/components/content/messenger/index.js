import React from 'react';
import Container from './container';
import Sender from './sender';

class Index extends React.Component {
  state={};

  render() {
    const { webRtc } = this.props;
    return (
      <div style={{ background: 'white', display: 'flex', justifyContent: 'space-between', flex: 1, flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', flex: 0.8 }}>
          <Container {...this.props} />
        </div>
        {webRtc.communicationContainer === 'chat' && (
        <div style={{ display: 'flex', background: '#f5f5f5', flex: 0.2, padding: 5 }}>
          <Sender {...this.props} />
        </div>
        )}
      </div>
    );
  }
}
export default Index;
