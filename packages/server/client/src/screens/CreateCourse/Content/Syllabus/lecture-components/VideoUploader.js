import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiFillCheckCircle } from 'react-icons/ai';
import FormFileInput from '../../../../../common/FormFileInput';
import { Button } from '../../../../../common/utility-functions/Button/Button';
import createVideo from './helper-functions/createVideo';
import uploadVideo from './helper-functions/uploadVideo';
import replaceVideo from './helper-functions/replaceVideo';

export default ({ callback, lecture, uploadLectureVideo }) => {
    const [video, setVideo] = useState({});
    const [loading, setLoading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);

    useEffect(() => {
        if (lecture.resources) {
            let vResource = lecture.resources.find(o => o.type === 'video');
            if (vResource) {
                setVideo(vResource);
            }
        }
    }, [lecture]);

    const onComplete = async (data) => {
        const res = await uploadLectureVideo({ ...data, sectionId: lecture.sectionId, lecId: lecture.id, type: 'video' }, lecture.resources && lecture.resources.find(o => o.type === 'video'));
        if (res) {
            setLoading(false);
            callback();
        }
    }

    const upload = async () => {
        if (!video.size) return;
        setLoading(true);
        let vResource = lecture.resources && lecture.resources.find(o => o.type === 'video');
        let res = null;
        if (vResource) {
          res = await replaceVideo(video, vResource.url);
        } else {
          res = await createVideo(video);
        }
        if (res) {
          const resourceData = { url: res.uri.split('/')[2], accessToken: res.upload.upload_link };
          uploadVideo(video, res.upload.upload_link, setUploadPercent, onComplete, resourceData);
        }
    }
    return (
        <>

            <div className="video-uploader">
                <FormFileInput
                    accept=".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv"
                    onChange={(id, value) => setVideo(value)}
                    data={{ name: 'video', id: 'video' }}
                    value={video}
                />
                <div className="video-buttons">
                    <Button loading={loading} type="button" onClick={upload} buttonStyle="btn--success--solid" buttonSize="btn--small" icon={<FaCloudUploadAlt size={20} />} />
                    <Button type="button" onClick={callback} buttonStyle="btn--danger--outline" buttonSize="btn--small" icon={<GiCancel size={20} />} />
                </div>
            </div>
            {uploadPercent > 0 &&
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ backgroundPosition: `${uploadPercent}%` }} />
                    {uploadPercent === 100 && <div className="complete-indicator"><AiFillCheckCircle size={20} /></div>}
                </div>
            }
        </>
    )
}
