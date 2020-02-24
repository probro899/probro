import React from 'react';
import { Button } from '@blueprintjs/core';
import store from '../../../../store';

export default async function (uid, props) {
  // console.log('stream recoder called', uid, store.getState().webRtc);
  // const stream = store.getState().webRtc.streams[uid];
  const videoElem = document.getElementById('video-mentor');
  // const stream = videoElem.captureStream() || videoElem.mozCaptureStream();
  const stream = videoElem.mozCaptureStream();

  let mediaRecorder;
  const recordedBlob = [];

  const handleDataAvailable = (event) => {
    // console.log('handleDataAvailabel called', event.data, event.data.size);
    if (event.data && event.data.size > 0) {
      recordedBlob.push(event.data);
    }
  };

  let options = { mimeType: 'video/webm;codecs=vp8' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not Supported`);

    options = { mimeType: 'video/webm;codecs=vp8' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);

      options = { mimeType: 'video/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        // types = ["video/webm",
        //      "audio/webm",
        //      "video/webm\;codecs=vp8",
        //      "video/webm\;codecs=daala",
        //      "video/webm\;codecs=h264",
        //      "audio/webm\;codecs=opus",
        //      "video/mpeg"];
        options = { mimeType: '' };
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10);
  } catch (e) {
    console.error('Media recorder error', e);
  }

  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped', event);
  };

  mediaRecorder.onpause = (event) => {
    console.log('Recoder Paused', event);
  };

  mediaRecorder.onresume = (event) => {
    console.log('Recoder resumed', event);
  };

  const downLoadButtonClickHandler = (sid) => {
    const { updateWebRtc } = props;
    console.log('downloadButton Click handler', sid);
    updateWebRtc('recordedBlobs', store.getState().webRtc.recordedBlobs.filter(a => Object.keys(a)[0] !== sid));
  };

  const downloadRecordedMedia = () => {
    const { updateWebRtc } = props;
    const { webRtc, database } = store.getState();
    const blob = new Blob(recordedBlob, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const formatedDate = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    updateWebRtc('recordedBlobs', [
      ...store.getState().webRtc.recordedBlobs,
      {
        [stream.id]: <a
          id={stream.id}
          href={url}
          className="recorded-item"
          // style={{ margin: 5 }}
          download={`${webRtc.localCallHistory.chatHistory.type === 'user' ? database.User.byId[webRtc.showCommunication].firstName : database.Board.byId[webRtc.showCommunication].name}-${formatedDate}`}
          // onClick={() => downLoadButtonClickHandler(stream.id)}
        >
          <div onClick={() => downLoadButtonClickHandler(stream.id)}>
            {`${webRtc.localCallHistory.chatHistory.type === 'user' ? database.User.byId[webRtc.showCommunication].firstName : database.Board.byId[webRtc.showCommunication].name}-${formatedDate}`}
          </div>
        </a>
      },
    ]);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    downloadRecordedMedia();
  };

  return { stopRecording, mediaRecorder, stream };
}
