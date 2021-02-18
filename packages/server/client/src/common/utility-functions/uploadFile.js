import axios from 'axios';
import imageCompressor from './imageCompressor';
import { ENDPOINT } from '../../config';


export default async (content, file, sessionId) => {
    const formData = new FormData();
    var type = file.type.split('/')[0]
    if (type === 'text') { type = 'application' }
    formData.append('data', JSON.stringify({ token: sessionId, fileType: type, content: content }));
    if (type === 'image') {
        let compressedImage = await imageCompressor(file)
        formData.append('file', compressedImage);
    } else {
        formData.append('file', file);
    }
    try {
        const res = await axios({
            config: { headers: { 'Content-Type': 'multipart/form-data' } },
            method: 'post',
            url: `${ENDPOINT}/web/upload-file`,
            data: formData,
        });
        if (res.status === 200) {
            return { status: 200, data: res.data };
        }
    } catch (e) {
        return { status: 400, data: 'Internal server error' };
    }
}
