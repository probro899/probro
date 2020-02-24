import React from 'react';
import PropTypes from 'prop-types';
import boardActivityBoardChart from './barChart';
import boardActivityLineChart from './lineChart';

class DrawChart extends React.Component {
  state = {};

  componentDidMount() {
    const boardActivityBoardChartCtx = document.getElementById('board-activity-bar-chart');
    const boardActivityLineChartCtx = document.getElementById('board-activity-line-chart');
    const { boardActivities, userList, users } = this.props;
    const individualUserBoadActivities = [];
    userList.forEach((u) => {
      const userBoardActivities = boardActivities.filter(ba => ba.userId === u.tuserId);
      individualUserBoadActivities.push(userBoardActivities);
    });
    const userNameList = userList.map(u => Object.values(users.byId).find(us => us.id === u.tuserId));
    const chartData = individualUserBoadActivities.map(ba => ba.length);
    boardActivityBoardChart(userNameList, chartData, boardActivityBoardChartCtx);
    boardActivityLineChart(userNameList, individualUserBoadActivities, boardActivityLineChartCtx, boardActivities);
  }

  render() {
    return (
      <div style={{ width: 800, height: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <canvas id="board-activity-bar-chart" width={400} height={400} />
          </div>
          <div>
            <canvas id="board-activity-line-chart" width={400} height={400} />
          </div>
        </div>
      </div>
    );
  }
}
export default DrawChart;
DrawChart.propTypes = {
  boardActivities: PropTypes.arrayOf(PropTypes.any).isRequired,
  userList: PropTypes.arrayOf(PropTypes.any).isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
};
