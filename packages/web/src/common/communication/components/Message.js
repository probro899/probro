/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import _ from 'lodash';
import { Spinner, Icon } from '@blueprintjs/core';
import { ENDPOINT } from '../../../config';
import sendMessage from '../helper-functions/message/index';

const findSeenUser = (props, seenStatus) => {
  // console.log('findSeenUser data', props, seenStatus);
  const { database, account } = props;
  const userList = _.uniq(seenStatus.filter(obj => obj.userId !== account.user.id).map(obj => obj.userId));
  // console.log('userList', userList);
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

const Message = ({ own, obj, props }) => {
  // console.log('own obj props', own, obj, props);
  return (
    <div
      className={own.isOwn ? 'i-chat right' : 'i-chat left'}
      key={obj.id}
    >
      <div className="img-wrap">
        {(own.user.userDetails && own.user.userDetails.image)
          ? <img alt="profile-img" src={`${ENDPOINT}/user/${10000000 + parseInt(own.user.id, 10)}/profile/${own.user.userDetails.image}`} style={{ height: 30, width: 30, borderRadius: '50%'}} />
          : <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#154155', height: 30, width: 30, borderRadius: '50%'}}>{`${own.user.firstName.charAt(0).toUpperCase()}${own.user.lastName.charAt(0).toUpperCase()}`}</div>
              }
      </div>
      <div className="text-contain">
        <Moment format="YYYY-MM-DD hh:mm">{obj.timeStamp}</Moment>
        <div className="text" style={{ background: own.isOwn ? (obj.status === 'error' ? '#ff7470' : '#A9DBEF') : 'white', border: `${own.isOwn ? ( obj.status === 'error' ? '1px solid red' : '1px solid #A9DBEF') : '1px solid white'}` }}>
          {obj.message}
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
