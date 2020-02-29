import Chart from 'chart.js';
import lineChart from '../screens/class/report/communicationActivityReport/lineChart';

export default (labels, title, yAxesLabelString, xAxesLabelString, datasets, context) => {
  const myChartLine = new Chart(context, {
    type: 'line',
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: yAxesLabelString,
          },
          ticks: {
            beginAtZero: true,
          },
        }],
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: xAxesLabelString,
          },
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
  return myChartLine;
};
