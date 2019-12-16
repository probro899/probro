import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../config';

const file = require('../../../assets/icons/512h/uploadicon512.png');

class PopularCandidate extends React.Component {
  state = { portrait: false };

  componentDidMount() {
    this.checkPortrait();
  }

  checkPortrait = () => {
    const { candidate } = this.props;
    const { user, userDetail } = candidate;
    const imgUrl = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetail.image}` : file;
    const img = new Image();
    img.onload = () => {
      if (img.height > img.width) {
        this.setState({
          portrait: true,
        });
      }
    };
    img.src = imgUrl;
  }

  render() {
    const { candidate } = this.props;
    const { user, userDetail } = candidate;
    const { portrait } = this.state;
    const imgUrl = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(user.id, 10)}/profile/${userDetail.image}` : file;
    return (
      <div className="popular">
        <div className="popularImage">
          <img
            className={portrait ? 'portrait' : 'landscape'}
            src={imgUrl}
            alt={`candidate ${userDetail.id}`}
          />
        </div>
        <div className="popularDesc">
          <Link to={`user/${user.slug}`} className="popularName">
            {
              `${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${user.lastName}`
            }
          </Link>
          <p className="popularExpertize">
            { candidate.expertize }
          </p>
        </div>
      </div>
    );
  }
}

PopularCandidate.propTypes = {
  candidate: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PopularCandidate;
