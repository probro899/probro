import React from 'react';
import BoardActivityReport from './boardActivityReport';
import CommunicationReport from './communicationActivityReport';

class DrawChart extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ width: 850, height: 'auto' }}>
        <BoardActivityReport {...this.props} />
        <CommunicationReport {...this.props} />
      </div>
    );
  }
}
export default DrawChart;
