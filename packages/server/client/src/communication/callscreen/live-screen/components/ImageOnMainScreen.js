/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import ScreenshareNotAllowedError from '../../error-screen/ScreenshareNotAllowedError';

// const userIcon = require('../../../../../assets/icons/512h/uploadicon512.png');

const ImageOnMainScreen = (props) => {
  const { webRtc, database, minimize } = props;
  console.log('webRtc value in ImageOnMainScreen', webRtc);
  let showImage = false;
  let imgUrl = '';
  let conId;
  let type;
  let user;
  let userDetail;
  if (webRtc.localCallHistory.chatHistory) {
    type = webRtc.localCallHistory.chatHistory.type;
    if (type === 'user') {
      conId = webRtc.localCallHistory.chatHistory.user.user.id;
    }
    if (type === 'board') {
      conId = database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].activeStatus
    }
  }

  if (type === 'user' && conId) {
    const userConnection = Object.values(database.UserConnection.byId).find(c => c.user.user.id === conId);
    if (userConnection) {
      user = userConnection.user.user;
      userDetail = userConnection.user.userDetail || {};
    }
  }

  if (type === 'user' && user && userDetail) {
    // const userDetail = Object.values(database.User.byId).find(o => o.userId === webRtc.localCallHistory.chatHistory.user.user.id);
    imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetail.image}` : '/assets/icons/512h/uploadicon512.png';
    if (webRtc.connectedUsers[conId] && webRtc.connectedUsers[conId].type === 'audio') {
      showImage = true;
    }
  } else if (webRtc.connectedUsers[conId] && database.Board.byId[webRtc.localCallHistory.chatHistory.connectionId].mediaType === 'audio') {
    showImage = true;
  }
  // console.log('showImage', showImage, webRtc.connectedUsers);
  if (webRtc.screenShareNotAllowed) {
    return (
      <div className="img-main-screen" style={{ display: minimize ? 'none' : 'flex' }}>
        <ScreenshareNotAllowedError {...props} />
      </div>
    );
  }
  if (!showImage) return <div />;
  return (
    <div className="img-main-screen" style={{ display: minimize ? 'none' : 'flex' }}>
      <div className={type}>
        {
          type === 'user' ? <RoundPicture imgUrl={imgUrl} /> : <Icon icon="application" iconSize={130} style={{ color: '#757575' }} />
        }
      </div>
    </div>
  );
};

ImageOnMainScreen.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  minimize: PropTypes.bool.isRequired,
};

export default ImageOnMainScreen;
