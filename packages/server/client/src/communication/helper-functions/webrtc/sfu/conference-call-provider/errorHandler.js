/* eslint-disable import/no-cycle */
import exceptionHandler from './exceptionHandler';

export default (err) => {
  exceptionHandler({ error: err, errorCode: 144 });
};
