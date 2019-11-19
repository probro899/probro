import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`/user/${user.id}/`}>
            {userName}
          </Link>
        </p>
        <p className="location">{userDetail.address}</p>
      </div>
    </div>
  );
}

class ResultList extends React.Component {
  state={};

  render() {
    const { data } = this.props;
    // console.log(data);
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

export default ResultList;
