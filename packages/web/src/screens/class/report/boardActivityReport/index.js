import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '@blueprintjs/core';
import boardActivityBoardChart from './barChart';
import boardActivityLineChart from './lineChart';

class DrawChart extends React.Component {
  state = { timelineValue: 'Day', myBarChart: null, myLineChart: null };

  componentDidMount() {
    const { timelineValue } = this.state;
    this.drawChart(timelineValue);
  }

  drawChart = (timelineValue) => {
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
    const myBarChart = boardActivityBoardChart(userNameList, chartData, boardActivityBoardChartCtx);
    const myLineChart = boardActivityLineChart(userNameList, individualUserBoadActivities, boardActivityLineChartCtx, boardActivities, timelineValue);
    this.setState({
      myLineChart,
      myBarChart,
    });
  }

  timelineChange = (e) => {
    const { myBarChart, myLineChart } = this.state;
    this.setState({
      timelineValue: e.target.value,
    });
    if (myBarChart) {
      myBarChart.destroy();
      myLineChart.destroy();
    }
    this.drawChart(e.target.value);
  }

  render() {
    const { timelineValue } = this.state;
    return (
      <div className="pc-canvases">
        <div className="pc-canvas-con">
          <canvas id="board-activity-bar-chart" width={400} height={400} />
        </div>
        <div className="pc-graph-timeline">
          <h3>Select a timeline: </h3>
          <RadioGroup
            className="pc-report-radio-group"
            inline
            onChange={this.timelineChange}
            selectedValue={timelineValue}
          >
            <Radio label="Day" value="Day" />
            <Radio label="Week" value="Week" />
            <Radio label="Month" value="Month" />
          </RadioGroup>
        </div>
        <div className="pc-canvas-con">
          <canvas id="board-activity-line-chart" width={400} height={400} />
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
