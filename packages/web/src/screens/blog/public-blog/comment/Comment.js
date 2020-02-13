import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

const Comment = (props) => {
  const { comment, user } = props;
  const imgUrl = user.userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.user.id, 10)}/profile/${user.userDetail.image}` : file;
  return (
    <div className="i-response">
      <div className="pc-profile-icon">
        <RoundPicture imgUrl={imgUrl} />
      </div>
      <div className="comment-content">
        <div>
          {
            user.user.middleName ? (
              <Link to={`/user/${user.user.slug}/`} key={`user-${user.user.id}`}>
                {`${user.user.firstName} ${user.user.middleName} ${user.user.lastName} `}
              </Link>
            )
              : (
                <Link to={`/user/${user.user.slug}/`} key={`user-${user.user.id}`}>
                  {`${user.user.firstName} ${user.user.lastName} `}
                </Link>
              )
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comment;
