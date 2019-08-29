import React from 'react';
import { Button } from '@blueprintjs/core';
import store from '../../../../../store';

export default async function (uid, props) {
  // console.log('stream recoder called', uid, store.getState().webRtc);
  // const stream = store.getState().webRtc.streams[uid];
  const stream = document.getElementById(`video-${uid}`).captureStream();

  let mediaRecorder;
  const recordedBlob = [];

  const handleDataAvailable = (event) => {
    // console.log('handleDataAvailabel called', event.data, event.data.size);
    if (event.data && event.data.size > 0) {
      recordedBlob.push(event.data);
    }
  };

  let options = { mimeType: 'video/webm;codecs=vp9' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not Supported`);

    options = { mimeType: 'video/webm;codecs=vp8' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);

      options = { mimeType: 'video/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = { mimeType: '' };
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(stream, options);
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

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10);

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
          style={{ margin: 5 }}
          download={`${database.Board.byId[webRtc.showCommunication].name}-${formatedDate}`}
        >
          <Button onClick={() => downLoadButtonClickHandler(stream.id)} style={{ background: 'green', color: 'white' }} rightIcon="download">{`${database.Board.byId[webRtc.showCommunication].name}-${formatedDate}`}</Button>
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
