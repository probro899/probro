import Chart from 'chart.js';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import isSameWeek from 'date-fns/isSameWeek';
import colorSets from './colorSets';
import allUserMonthActivityFormater from './helper-functions/allUserActivityFormater';
import allFormater from './helper-functions/allFormater';

const lableRenderHelper = (allBoardActivities, todoFunc) => {
  const lables = [];
  const counts = todoFunc(new Date(Date.now()), new Date(allBoardActivities[0].timeStamp));
  for (let i = 1; i <= counts + 1; i += 1) {
    lables.push(i);
  }
  return lables;
};

export default (userList, data, ctx, allBoardActivities) => {
  const boardActivitiesInDays = allFormater(allBoardActivities, isSameDay);
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lableRenderHelper(allBoardActivities, differenceInDays),
      datasets: userList.map((user, idx) => ({
        label: user.firstName,
        backgroundColor: colorSets[idx],
        borderColor: colorSets[idx],
        data: allUserMonthActivityFormater(boardActivitiesInDays, user.id),
        fill: false,
      })),
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Board Activities Line Chart',
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
            labelString: 'Board Activities',
          },
          ticks: {
            beginAtZero: true,
          },
        }],
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'No Of Days',
          },
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
};
