/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Button } from '@blueprintjs/core';

export default (props) => {
  const { webRtc, updateWebRtc, _callHandler } = props;
  // console.log('props in screenshare not allowed error component', props);
  const { screenShareNotAllowed } = webRtc;

  const dismissHandler = () => {
    updateWebRtc('screenShareNotAllowed', false);
    updateWebRtc('localCallHistory', { ...webRtc.localCallHistory, mediaType: 'audio', callEnd: false });
    _callHandler('audio');
  };

  if (screenShareNotAllowed) {
    return (
      <Card style={{ width: '80%', zIndex: 5 }}>
        <h3>You must authorize screen sharing</h3>
        <span>Properclass is not able to enable screen sharing. It may come from your browser or OS authorizations.</span>
        <span>
          Please refer
          <a href="https://support.livestorm.co/article/131-troubleshoot-screen-sharing" target="_blank">
            to this article
          </a>
          to fix this issue.
        </span>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            intent="danger"
            style={{ height: 10 }}
            onClick={dismissHandler}
            text="dismiss"
          />
        </div>
      </Card>
    );
  }
  return null;
};
