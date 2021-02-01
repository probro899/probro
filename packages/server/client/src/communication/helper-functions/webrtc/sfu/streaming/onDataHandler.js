import store from '../../../../../store';

export default props => (data) => {
  const { updateWebRtc } = props;
  const { webRtc, account } = store.getState();
  const jsData = JSON.parse(data);
  console.log('Data in dataHandler', JSON.parse(data));
};
