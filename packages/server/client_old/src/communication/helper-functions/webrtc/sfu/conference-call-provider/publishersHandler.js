/* eslint-disable import/no-cycle */
import addRemoteFeedHandler from './addRemoteFeedHandler';
import callAccesptHanlder from './callAcceptHandler';

export default (msg, props) => {
  const { publishers } = msg;
  if (publishers && publishers.length > 0) {
    callAccesptHanlder(props);
    publishers.forEach(p => addRemoteFeedHandler(p, props));
  }
};
