/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
import { ENDPOINT } from '../../../../config';

const SingleAttachment = ({ obj, user, getName, deleteAttachment }) => {
  // const name = getName(obj.userId);
  const link = `${ENDPOINT}/assets/user/${10000000 + parseInt(obj.userId, 10)}/board/${obj.url}`;
  return (
    <li>
      <div className="file-type">
        <span>
          {obj.url.split('.')[1]}
        </span>
        <Icon
          iconSize={11}
          style={{ cursor: 'pointer' }}
          icon="cross"
          className="pc-attach-delete"
          onClick={() => deleteAttachment(obj.id, obj.url)}
        />
      </div>
      <div className="file-detail">
        <a rel="noopener noreferrer" target="_blank" href={link} className="attach-title">
          {obj.name}
        </a>
        <div>
          <span className="date">{moment(obj.timeStamp).format('DD-MM-YYYY')}</span>
          {' - '}
          <Link to={`/user/${user.slug}`}>{user.firstName}</Link>
        </div>
      </div>
    </li>
  );
};

export default ({ attachments, Users, getName, deleteAttachment }) => {
  // console.log('attachment data', attachments);
  return (
    <div className="attach-container">
      {attachments.length !== 0 && <div className="attach-head">Attachments</div>}
      <div className="attach-list">
        <ul>
          {attachments.map(obj => <SingleAttachment user={obj.user.user} getName={getName} deleteAttachment={deleteAttachment} obj={obj} key={obj.id} />)}
        </ul>
      </div>
    </div>
  );
};
