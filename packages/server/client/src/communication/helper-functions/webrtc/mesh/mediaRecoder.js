/* eslint-disable no-undef */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import store from '../../../../store';

export default async function (uid, props) {
  const videoElem = document.getElementById('video-mentor');
  const stream = videoElem.captureStream ? videoElem.captureStream() : videoElem.mozCaptureStream();

  let mediaRecorder;
  const recordedBlob = [];

  const handleDataAvailable = (event) => {
    // console.log('handleDataAvailabel called', event.data, event.data.size);
    if (event.data && event.data.size > 0) {
      recordedBlob.push(event.data);
    }
  };

  let options = { mimeType: 'video/webm;codecs="vp8,opus"' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    // console.error(`${options.mimeType} is not Supported`);

    options = { mimeType: 'video/webm;codecs="vp8, opus"' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      // console.error(`${options.mimeType} is not supported`);

      options = { mimeType: 'video/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        // console.error(`${options.mimeType} is not supported`);
        options = { mimeType: '' };
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10);
  } catch (e) {
    // console.error('Media recorder error', e);
  }

  mediaRecorder.onstop = (event) => {
    // console.log('Recorder stopped', event);
  };

  mediaRecorder.onpause = (event) => {
    // console.log('Recoder Paused', event);
  };

  mediaRecorder.onresume = (event) => {
    // console.log('Recoder resumed', event);
  };

  const downLoadButtonClickHandler = async (sid) => {
    const { updateWebRtc } = props;
    await updateWebRtc('recordedBlobs', store.getState().webRtc.recordedBlobs.filter(a => parseInt(Object.keys(a)[0], 10) !== sid));
  };

  const downloadRecordedMedia = async () => {
    const { updateWebRtc } = props;
    const sid = Date.now();
    const { webRtc } = store.getState();
    const blob = new Blob(recordedBlob, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const formatedDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    await updateWebRtc('recordedBlobs', [
      ...store.getState().webRtc.recordedBlobs,
      {
        [sid]: <a
          id={sid}
          href={url}
          className="recorded-item"
          download={`${webRtc.localCallHistory.chatHistory.type === 'user' ? `${webRtc.localCallHistory.chatHistory.user.user.firstName}` : `${webRtc.localCallHistory.chatHistory.boardDetails.name}`}-${formatedDate}.webm`}
        >
          <div onClick={() => downLoadButtonClickHandler(sid)}>
            {`${webRtc.localCallHistory.chatHistory.type === 'user' ? `${webRtc.localCallHistory.chatHistory.user.user.firstName}` : `${webRtc.localCallHistory.chatHistory.boardDetails.name}`}-${formatedDate}`}
          </div>
        </a>,
      },
    ]);
  };

  const stopRecording = async () => {
    await downloadRecordedMedia();
    mediaRecorder.stop();
  };

  return { stopRecording, mediaRecorder, stream };
}
