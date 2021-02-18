/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import _ from 'lodash';
import { BsArrowRepeat } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { ENDPOINT } from '../../config';
import sendMessage from '../helper-functions/message/index';
import { RoundPicture } from '../../components';
import { matchUrl } from '../../common/utility-functions';

const findSeenUser = (props, seenStatus, own) => {
  const { database, account, webRtc } = props;
  const userList = seenStatus.filter(obj => obj.userId !== account.user.id);
  const userNameList = [];
  userList.forEach((us) => {
    let userDetails;
    let user;
    if (webRtc.chatHistory.type === 'user') {
      user = webRtc.chatHistory.user.user;
      userDetails = webRtc.chatHistory.user.userDetails;
    } else {
      const boardUser = Object.values(database.BoardMember.byId).find(bm => bm.tuserId === us.userId);
      user = boardUser.user.user;
      userDetails = boardUser.user.userDetail;
    }
    userNameList.push(<div className="seen-user"><RoundPicture imgUrl={userDetails && userDetails.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetails.image}` : '/assets//graphics/user.svg'} /></div>);
  });
  return userNameList;
};

const Message = ({ own, obj, props, type }) => {
  const getMessageText = () => {
    return <p className="pc-message" dangerouslySetInnerHTML={{ __html: matchUrl(obj.message) }} style={{ maxWidth: '100%', wordBreak: 'break-word' }} />;
  };

  return (
    <div
      className={own.isOwn ? 'i-chat right' : 'i-chat left'}
      key={obj.id}
      style={{ marginTop: obj.showImage && 15 }}
    >
      {(obj.showImage && !own.isOwn) && (
        <div className="img-wrap">
          <RoundPicture imgUrl={(own.user.userDetails && own.user.userDetails.image) ? `${ENDPOINT}/assets/user/${10000000 + parseInt(own.user.id, 10)}/profile/${own.user.userDetails.image}` : '/assets//graphics/user.svg'} />
        </div>
      )
      }
      <div className={`text-contain${(!obj.showImage && !own.isOwn) ? ' spaced' : ''}`}>
        {/* {obj.showImage && !own.isOwn && <span style={{ fontSize: 10, color: '#757575', marginLeft: 5 }}>{own.user.firstName}</span>} */}
        <div
          className="text"
          style={{
            background: own.isOwn ? (obj.status === 'error' ? '#ff7470' : '#DCE7FF') : '#fff',
            border: `${own.isOwn ? (obj.status === 'error' ? '1px solid red' : '1px solid #DCE7FF') : '1px solid #fff'}`,
            padding: '10px 15px',
            // paddingBottom: 0,
            margin: 0,
            marginRight: 5,
            marginLeft: (!obj.showImage && !own.isOwn) ? (type ? 3 : 45) : 3,
            marginBottom: !obj.showImage && 0,
          }}
        >
          {getMessageText()}
          <div className="pc-date-time" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Moment style={{ color: '#757575' }} format="h:mm:a">{obj.timeStamp}</Moment>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          {obj.status === 'loading' && <ClipLoader size="15" />}
          {obj.status === 'error' && <BsArrowRepeat size="15" style={{ cursor: 'pointer' }} onClick={() => sendMessage({ ...props, message: obj.message, resend: obj.id })} />}
          <div style={{ marginTop: 2, display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            {findSeenUser(props, obj.seenStatus, own)}
          </div>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  own: PropTypes.objectOf(PropTypes.any).isRequired,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
