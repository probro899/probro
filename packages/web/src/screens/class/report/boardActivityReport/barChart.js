import BarChart from '../../../../common/BarChart';

export default (userList, dataList, ctx) => {
  const labels = userList.map(u => u.firstName);
  const label = 'Board Activities';
  const data = dataList;
  const title = 'Boar Activities Bar Chart';
  const yAxesLabelString = 'User List';
  const xAxesLabelString = 'No of Board Activities';
  const context = ctx;
  const bar = BarChart(labels, label, data, title, yAxesLabelString, xAxesLabelString, context);
  return bar;
};
