import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdMyLocation } from 'react-icons/md';
import { ENDPOINT } from '../../../../config/index';
import { RoundPicture } from '../../../../components';

const icon = require('../../../../assets/icons/64w/uploadicon64.png');

const User = ({ item }) => {
  const { user } = item;
  const { userDetail } = item;
  const userName = user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`;
  const profilePic = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetail.image}` : icon;
  return (
    <div className="i-result">
      <div className="img-con">
        <RoundPicture imgUrl={profilePic} />
      </div>
      <div className="desc-con">
        <p className="name">
          <Link to={`/user/${user.slug}/`}>
            {userName}
          </Link>
        </p>
        <div className="location">
          <div><MdMyLocation /></div>
          <div className="country">{userDetail.country ? userDetail.country : '---'}</div>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

class ResultList extends React.Component {
  state={};

  render() {
    const { data } = this.props;
    return (
      <div className="result-list">
        <p className="label">
          Showing
          {' '}
          {data.length}
          {' '}
          results
        </p>
        {
          data.map((obj, index) => {
            return <User key={index} item={obj} />;
          })
        }
      </div>
    );
  }
}

ResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ResultList;
