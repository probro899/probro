/* eslint-disable react/prop-types */
import React from 'react';
import {Button} from '../../../common/utility-functions/Button/Button';

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
      <div style={{ width: '80%', zIndex: 5,background:'#fff', padding:'20px', borderRadius:'10px' }}>
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
           onClick={dismissHandler}
           type="button"
           buttonStyle="btn--danger--solid"
           buttonSize="btn--medium"
           title="Dismiss"
          />
        </div>
      </div>
    );
  }
  return null;
};
