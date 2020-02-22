import axios from 'axios';
import { ENDPOINT } from '../../../config';

export default async (data) => {
  // console.log('capture canvas called', data);
  const { canvas, account, addDatabaseSchema, apis } = data;
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
  const file = new File([u8arr], 'canvas-shot.jpeg', { type: mime });
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
    }
    return { response: 200, message: 'Uploaded' };
  } catch (e) {
    return { response: 400, error: 'Network issues' };
  }
};
