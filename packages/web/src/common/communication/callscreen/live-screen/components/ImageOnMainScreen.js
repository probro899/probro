import React from 'react';
import { Icon } from '@blueprintjs/core';
import { RoundPicture } from '../../../../../components';
import { ENDPOINT } from '../../../../../config';

const userIcon = require('../../../../../assets/icons/512h/uploadicon512.png');

export default (props) => {
  const { webRtc, database } = props;
  let showImage = false;
  let imgUrl = '';
  const conId = webRtc.mainStreamId;
  if (webRtc.chatHistory.type === 'user') {
    const userDetail = Object.values(database.UserDetail.byId).find(o => o.userId === webRtc.chatHistory.user.user.id);
    imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : userIcon;
    if (webRtc.connectedUsers[conId] && webRtc.connectedUsers[conId].type === 'audio') {
      showImage = true;
    }
  } else if (webRtc.connectedUsers[conId] && webRtc.connectedUsers[conId].type === 'audio') {
    showImage = true;
  }
  if (!showImage) return <div />;
  return (
    <div className="img-main-screen">
      <div className={webRtc.chatHistory.type === 'user' ? 'user' : 'board'}>
        {
          webRtc.chatHistory.type === 'user' ? <RoundPicture imgUrl={imgUrl} /> : <Icon icon="application" iconSize={130} style={{ color: '#757575' }} />
        }
      </div>
    </div>
  );
};
