import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const file = require('../../../../../assets/icons/64w/uploadicon64.png');

const Comment = (props) => {
  const { comment, UserTable } = props;
  return (
    <div className="i-response">
      <img
        alt="profile comment author"
        src={file}
        height="64px"
        style={{ borderRadius: '50%' }}
      />
      <div className="comment-content">
        <div>
          {
            Object.values(UserTable.byId).map((obj) => {
              if (obj.id === comment.userId) {
                const user = obj;
                return user.middleName ? (
                  <Link to={`/user/${user.id}/`}>
                    {`${user.firstName} ${user.middleName} ${user.lastName} `}
                  </Link>
                )
                  : (
                    <Link to={`/user/${user.id}/`}>
                      {`${user.firstName} ${user.lastName} `}
                    </Link>
                  );
              }
            })
          }
          <small>
            <Moment
              style={{ fontSize: 12, color: '#757575' }}
              format="YYYY-MM-DD hh:mm"
            >
              {comment.timeStamp}
            </Moment>
          </small>
        </div>
        <p>
          {comment.comment}
        </p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  UserTable: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
