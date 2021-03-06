import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import { differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import isSameWeek from 'date-fns/isSameWeek';
import allUserMonthActivityFormater from '../helper-functions/allUserActivityFormater';
import allFormater from '../helper-functions/allFormater';
import LineChart from '../../../../common/LineChart';
import colorSets from '../../../../common/colorSets';

const lableRenderHelper = (allBoardActivities, todoFunc) => {
  const lables = [];
  const counts = todoFunc(new Date(Date.now()), new Date(allBoardActivities[0].timeStamp));
  for (let i = 1; i <= counts + 1; i += 1) {
    lables.push(i);
  }
  return lables;
};

export default (userList, data, ctx, allBoardActivities, type) => {
  let boardActivitiesInDays; let labels;
  switch (type) {
    case 'Week':
      boardActivitiesInDays = allFormater(allBoardActivities, isSameWeek);
      labels = lableRenderHelper(allBoardActivities, differenceInWeeks);
      break;
    case 'Month':
      boardActivitiesInDays = allFormater(allBoardActivities, isSameMonth);
      labels = lableRenderHelper(allBoardActivities, differenceInMonths);
      break;
    default:
      boardActivitiesInDays = allFormater(allBoardActivities, isSameDay);
      labels = lableRenderHelper(allBoardActivities, differenceInDays);
  }
  const title = 'Communication Activities';
  const yAxesLabelString = 'Communication Activities';
  const xAxesLabelString = 'No of Days';
  const datasets = userList.map((user, idx) => ({
    label: user.firstName,
    backgroundColor: colorSets[idx],
    borderColor: colorSets[idx],
    data: allUserMonthActivityFormater(boardActivitiesInDays, user.id),
    fill: false,
  }));
  const context = ctx;
  const lineChart = LineChart(labels, title, yAxesLabelString, xAxesLabelString, datasets, context);
  return lineChart;
};
