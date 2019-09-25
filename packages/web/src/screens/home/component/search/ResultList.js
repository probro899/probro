import React from 'react';
import { Link } from 'react-router-dom';

const icon = require('../../../../assets/icons/64w/uploadicon64.png');

const User = ({ item }) => {
  const user = item.user;
  // const userDetail = item.userDetail;
  const userName = user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`;
  return (
    <div className="i-result">
      <div className="img-con">
        <img
          alt="profile thumnail"
          src={icon}
        />
      </div>
      <div className="desc-con">
        <p className="name">
          <Link to={`/user/${user.id}/`}>
            {userName}
          </Link>
        </p>
        <p>Software Engineer</p>
        <p className="location">Nepal</p>
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
        <p className="label">Showing {data.length} results</p>
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
