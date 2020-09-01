import React from 'react';
import BoardActivityReport from './boardActivityReport';
import CommunicationReport from './communicationActivityReport';

class DrawChart extends React.Component {
  state = {};

  render() {
    const { boardCommunicationActivities } = this.props;
    return (
      <div className="pc-report-charts">
        <BoardActivityReport {...this.props} />
        {boardCommunicationActivities.length > 0 ? <CommunicationReport {...this.props} /> : null}
      </div>
    );
  }
}
export default DrawChart;
