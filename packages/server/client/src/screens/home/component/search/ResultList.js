import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdMyLocation } from 'react-icons/md';
import { ENDPOINT } from '../../../../config/index';
import { RoundPicture } from '../../../../components';

const User = ({ item }) => {
  // console.log('item', item);
  const { id, slug, firstName, lastName } = item;
  const { userDetail } = item;
  // console.log('userDetail', userDetail);
  let profilePic = '/assets/icons/64w/uploadicon64.png';
  let country = '---';
  if (userDetail) {
    profilePic = userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(id, 10)}/profile/${userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
    country = userDetail.country ? userDetail.country : '---';
  }
  return (
    <div className="i-result">
      <div className="img-con">
        <RoundPicture imgUrl={profilePic} />
      </div>
      <div className="desc-con">
        <p className="name">
          <Link to={`/user/${slug}/`}>
            {`${firstName} ${lastName}`}
          </Link>
        </p>
        <div className="location">
          <div><MdMyLocation /></div>
          <div className="country">{country}</div>
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
