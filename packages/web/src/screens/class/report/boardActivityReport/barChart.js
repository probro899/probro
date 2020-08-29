import BarChart from '../../../../common/BarChart';

export default (userList, dataList, ctx) => {
  const labels = userList.map(u => u.firstName);
  const label = 'Class Activities';
  const data = dataList;
  const title = 'Class Activities Bar Chart';
  const yAxesLabelString = 'User List';
  const xAxesLabelString = 'No of Class Activities';
  const context = ctx;
  const bar = BarChart(labels, label, data, title, yAxesLabelString, xAxesLabelString, context);
  return bar;
};
