import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Message = ({ own, obj, file }) => {
  return (
    <div
      className={own ? 'i-chat right' : 'i-chat left'}
    >
      <div className="img-wrap">
        <img
          src={obj.imageUrl ? 'https://amp.businessinsider.com/images/5d0251196fc920014b1ed907-1920-1380.jpg' : file}
          height="50px"
          width="50px"
          alt="profile of the user"
        />
      </div>
      <div className="text-contain">
        <Moment format="YYYY-MM-DD hh:mm">{obj.timeStamp}</Moment>
        <div className="text">
          {obj.text}
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  own: false,
};

Message.propTypes = {
  own: PropTypes.bool,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
  file: PropTypes.string.isRequired,
};

export default Message;
