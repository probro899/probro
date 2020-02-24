import axios from 'axios';
import { ENDPOINT } from '../../../config';

const convertCanvasToImage = (canvas, name) => {
  const dataUrl = canvas.toDataURL({
    format: 'jpeg',
    quality: 1,
  });
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], name, { type: mime });
  return file;
};

const postImageToServer = async (file, account) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'report' }));
    formData.append('file', file);
    const res = await axios({
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      method: 'post',
      url: `${ENDPOINT}/web/upload-file`,
      data: formData,
    });
    if (res.status === 200) {
      console.log('convasCapture res', res.data);
      return res.data;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default async (data) => {
  // console.log('capture canvas called', data);
  const { canvas, account, addDatabaseSchema, apis, boardDetail, tableData } = data;
  const imageName = ['BoarActivityBarChart.jpeg', 'BoardActivityLineChart.jpeg', 'CommunicationActivityBarChart.jpeg', 'CommunicationActivityLineChart.jpeg'];
  const canvasNameNeedToCapture = ['board-activity-bar-chart', 'board-activity-line-chart', 'communication-activity-bar-chart', 'communication-activity-line-chart'];
  const canvasElements = canvasNameNeedToCapture.map(c => document.getElementById(c));
  const imageFiles = canvasElements.map((ce, idx) => convertCanvasToImage(ce, imageName[idx]));
  console.log('canvas Images', imageFiles);
  const postReq = imageFiles.map(file => postImageToServer(file, account));
  const postedImages = await Promise.all(postReq);
  console.log('Posted images', postedImages, apis);
  const reportRes = await apis.generateReport({ allImages: postedImages, boardDetail, tableData });
  console.log('generate Report Res', reportRes);
};
