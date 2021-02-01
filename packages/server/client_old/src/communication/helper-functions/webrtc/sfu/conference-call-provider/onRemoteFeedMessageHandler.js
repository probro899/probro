/* eslint-disable import/no-cycle */
import exceptionHandler from './exceptionHandler';

export default (msg, jsep, remoteFeed, roomId) => {
  if (jsep) {
    remoteFeed.createAnswer(
      {
        jsep,
        media: { audioSend: false, videoSend: false, data: true },
        success: (answerJsep) => {
          const body = { request: 'start', room: roomId };
          remoteFeed.send({ message: body, jsep: answerJsep });
        },
        error: (error) => {
          exceptionHandler({ error: JSON.stringify(error), errorCode: 119 });
        },
      }
    );
  }
};
