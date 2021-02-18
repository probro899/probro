import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio } from '../../../../common/RadioButton';
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
  state = { timelineValue: 'Day', myBarChart: null, myLineChart: null };

  componentDidMount() {
    const { timelineValue } = this.state;
    this.drawChart(timelineValue);
  }

  drawChart = (timelineValue) => {
    const boardActivityBoardChartCtx = document.getElementById('communication-activity-bar-chart');
    const boardActivityLineChartCtx = document.getElementById('communication-activity-line-chart');
    const { boardCommunicationActivities, userList, users } = this.props;
    const individualUserCommunicationActivities = [];
    userList.forEach((u) => {
      const userBoardActivities = boardCommunicationActivities.filter(ba => ba.userId === u.tuserId);
      individualUserCommunicationActivities.push(userBoardActivities);
    });
    const userNameList = userList.map(u => u.user.user);
    // console.log('Board Message Activities', individualUserCommunicationActivities);
    const chartData = individualUserCommunicationActivities.map(ba => hoursCalculator(ba));
    const myBarChart = barChart(userNameList, chartData, boardActivityBoardChartCtx);
    const myLineChart = lineChart(userNameList, individualUserCommunicationActivities, boardActivityLineChartCtx, boardCommunicationActivities, timelineValue);
    this.setState({
      myLineChart,
      myBarChart,
    });
  }

  timelineChange = (e) => {
    const { myLineChart, myBarChart } = this.state;
    this.setState({
      timelineValue: e.target.value,
    });
    if (myLineChart) {
      myLineChart.destroy();
      myBarChart.destroy();
    }
    this.drawChart(e.target.value);
  }

  render() {
    const { timelineValue } = this.state;
    return (
      <div className="pc-canvases">
        <div className="pc-canvas-con">
          <canvas id="communication-activity-bar-chart" width={400} height={400} />
        </div>
        <div className="pc-graph-timeline">
          <h3>Select a timeline: </h3>
          <RadioGroup
            className="pc-report-radio-group"
            onChange={this.timelineChange}
            selectedValue={timelineValue}
          >
            <Radio label="Day" value="Day" />
            <Radio label="Week" value="Week" />
            <Radio label="Month" value="Month" />
          </RadioGroup>
        </div>
        <div className="pc-canvas-con">
          <canvas id="communication-activity-line-chart" width={400} height={400} />
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
