import React from 'react';
import BoardActivityReport from './boardActivityReport';
import CommunicationReport from './communicationActivityReport';

class DrawChart extends React.Component {
  state = {};

  render() {
    return (
      <div className="pc-report-charts">
        <BoardActivityReport {...this.props} />
        <CommunicationReport {...this.props} />
      </div>
    );
  }
}
export default DrawChart;
