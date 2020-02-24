import Chart from 'chart.js';
import colorSets from './colorSets';

export default (labels, label, data, title, yAxesLabelString, xAxesLabelString, context) => {
  console.log('Common Bar chart called', labels);
  const myChart = new Chart(context, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: labels.map((u, idx) => colorSets[idx]),
        borderColor: labels.map((u, idx) => colorSets[idx]),
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
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
};
