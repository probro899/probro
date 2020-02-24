import React from 'react';
import PropTypes from 'prop-types';
import barChart from './barChart';
import lineChart from './lineChart';

const hoursCalculator = (arr) => {
  const value = arr.reduce((t, n) => {
    if (n.type) {
      t += n.duration;
    }
    return t;
  }, 0);
  return (value / (1000 * 60 * 60)).toFixed(2);
};

class DrawChart extends React.Component {
  state = {};

  componentDidMount() {
    const boardActivityBoardChartCtx = document.getElementById('communication-activity-bar-chart');
    const boardActivityLineChartCtx = document.getElementById('communication-activity-line-chart');
    const { boardCommunicationActivities, userList, users, database, boardId } = this.props;
    const individualUserCommunicationActivities = [];
    userList.forEach((u) => {
      const userBoardActivities = boardCommunicationActivities.filter(ba => ba.userId === u.tuserId);
      individualUserCommunicationActivities.push(userBoardActivities);
    });
    const userNameList = userList.map(u => Object.values(users.byId).find(us => us.id === u.tuserId));
    console.log('Board Message Activities', individualUserCommunicationActivities);
    const chartData = individualUserCommunicationActivities.map(ba => hoursCalculator(ba));
    barChart(userNameList, chartData, boardActivityBoardChartCtx);
    lineChart(userNameList, individualUserCommunicationActivities, boardActivityLineChartCtx, boardCommunicationActivities );
  }

  render() {
    return (
      <div style={{ width: 850, height: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <canvas id="communication-activity-bar-chart" width={400} height={400} />
          </div>
          <div>
            <canvas id="communication-activity-line-chart" width={400} height={400} />
          </div>
        </div>
      </div>
    );
  }
}
export default DrawChart;
DrawChart.propTypes = {
  boardCommunicationActivities: PropTypes.arrayOf(PropTypes.any).isRequired,
  userList: PropTypes.arrayOf(PropTypes.any).isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
};
