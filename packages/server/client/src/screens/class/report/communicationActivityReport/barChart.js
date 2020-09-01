import BarChart from '../../../../common/BarChart';

export default (userList, dataList, ctx) => {
  const labels = userList.map(u => u.firstName);
  const label = 'Communication Activities';
  const data = dataList;
  const title = 'Communication Activities Bar Chart';
  const yAxesLabelString = 'User List';
  const xAxesLabelString = 'No Of Hours';
  const context = ctx;
  const barchart = BarChart(labels, label, data, title, yAxesLabelString, xAxesLabelString, context);
  return barchart;
};
