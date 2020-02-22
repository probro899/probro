import axios from 'axios';
import { ENDPOINT } from '../../../config';

export default (boardId) => {
  console.log('fetch report called', boardId);
  try {
    const res = axios.get(`${ENDPOINT}/fetch-report-data?boardId=${boardId}`);
    console.log('Board id', res);
    return res;
  } catch (e) {
    return false;
  }
};
