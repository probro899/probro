/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import _ from 'lodash';
import { Spinner, Icon } from '@blueprintjs/core';
import { ENDPOINT } from '../../../config';
import sendMessage from '../helper-functions/message/index';

const findSeenUser = (props, seenStatus) => {
  const { database, account } = props;
  const userList = _.uniq(seenStatus.filter(obj => obj.userId !== account.user.id).map(obj => obj.userId));
  const userNameList = [];
  userList.forEach((id) => {
    const userDetails = Object.values(database.UserDetail.byId).find(ud => ud.userId === id);
    if (userDetails && userDetails.image) {
      userNameList.push(<img alt="profile-img" src={`${ENDPOINT}/user/${10000000 + parseInt(userDetails.userId, 10)}/profile/${userDetails.image}`} style={{ marginRight: 2, height: 15, width: 15, borderRadius: '50%' }} />);
    } else {
      userNameList.push(<div style={{ marginRight: 2, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#154155', height: 15, width: 15, borderRadius: '50%'}}><span style={{ fontSize: 7 }}>{`${database.User.byId[id].firstName.charAt(0).toUpperCase()}${database.User.byId[id].lastName.charAt(0).toUpperCase()}`}</span></div>);
    }
  });
  return userNameList;
};

const Message = ({ own, obj, props, type }) => {
  return (
    <div
      className={own.isOwn ? 'i-chat right' : 'i-chat left'}
      key={obj.id}
      style={{ marginTop: obj.showImage && 15 }}
    >
      { ((obj.showImage && !own.isOwn) || (type && !own.isOwn)) && (
      <div className="img-wrap">
          {(own.user.userDetails && own.user.userDetails.image)
            ? <img alt="profile-img" src={`${ENDPOINT}/user/${10000000 + parseInt(own.user.id, 10)}/profile/${own.user.userDetails.image}`} style={{ height: 30, width: 30, borderRadius: '50%'}} />
            : <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#154155', height: 30, width: 30, borderRadius: '50%'}}>{`${own.user.firstName.charAt(0).toUpperCase()}${own.user.lastName.charAt(0).toUpperCase()}`}</div>
                }
      </div>
      )
      }
      <div className="text-contain">
        {obj.showImage && !own.isOwn && <span style={{ fontSize: 10, color: '#757575', marginLeft: 5 }}>{own.user.firstName}</span>}
        <div
          className="text"
          style={{
            background: own.isOwn ? (obj.status === 'error' ? '#ff7470' : '#A9DBEF') : 'white',
            border: `${own.isOwn ? (obj.status === 'error' ? '1px solid red' : '1px solid #A9DBEF') : '1px solid white'}`,
            padding: 2,
            paddingBottom: 0,
            margin: 0,
            marginRight: 5,
            marginLeft: (!obj.showImage && !own.isOwn) ? (type ? 3 : 33) : 3,
            marginBottom: !obj.showImage && 0,
          }}
        >
          {obj.message}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Moment style={{ color: '#757575' }} format="h:mm:a">{obj.timeStamp}</Moment>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
          { obj.status === 'loading' && <Spinner size="15" intent="primary" /> }
          {obj.status === 'error' && <Icon icon="repeat" iconSize="15" style={{ cursor: 'pointer' }} onClick={() => sendMessage({ ...props, message: obj.message, resend: obj.id })} />}
          <div style={{ marginTop: 2, display: 'flex', width: '100%', justifyContent: 'center'}}>
            {findSeenUser(props, obj.seenStatus)}
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
};

export default Message;
