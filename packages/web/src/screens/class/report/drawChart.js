import React from 'react';
import boardActivityBoardChart from './baordActivityBarChart';
import boardActivityLineChart from './boardActivityLineChart';

class DrawChart extends React.Component {
  state = {};

  componentDidMount() {
    const boardActivityBoardChartCtx = document.getElementById('board-activity-bar-chart');
    const boardActivityLineChartCtx = document.getElementById('board-activity-line-chart');
    const { data, userList, users } = this.props;
    console.log('data in draw chart component', data, userList, users);
    const individualUserBoadActivities = [];
    userList.forEach((u) => {
      const userBoardActivities = data.filter(ba => ba.userId === u.tuserId);
      individualUserBoadActivities.push(userBoardActivities);
    });
    const userNameList = userList.map(u => Object.values(users.byId).find(us => us.id === u.tuserId));
    console.log('User board activitees', individualUserBoadActivities);
    const chartData = individualUserBoadActivities.map(ba => ba.length);
    boardActivityBoardChart(userNameList, chartData, boardActivityBoardChartCtx);
    boardActivityLineChart(userNameList, individualUserBoadActivities, boardActivityLineChartCtx, data);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', width: 800, height: 'auto' }}>
        <div>
          <canvas id="board-activity-bar-chart" width={300} height={300} />
        </div>
        <div>
          <canvas id="board-activity-line-chart" width={300} height={300} />
        </div>
      </div>
    );
  }
}
export default DrawChart;
