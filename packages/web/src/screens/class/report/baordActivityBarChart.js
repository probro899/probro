import Chart from 'chart.js';
import colorSets from './colorSets';

export default (userList, dataList, ctx) => {
  const myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: userList.map(u => u.firstName),
      datasets: [{
        label: 'Board Activities',
        data: dataList,
        backgroundColor: userList.map((u, idx) => colorSets[idx]),
        borderColor: userList.map((u, idx) => colorSets[idx]),
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Boar Activities Bar Chart',
      },
      scales: {
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'User List',
          },
          ticks: {
            beginAtZero: true,
          },
        }],
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'No of Board Activities',
          },
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
};
