/* eslint-disable import/no-cycle */
import exceptionHandler from './exceptionHandler';

export default (err) => {
  exceptionHandler({ error: JSON.stringify(err), errorCode: 144 });
};
