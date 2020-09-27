import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ENDPOINT } from '../../../config';
import getName from '../../../common/utility-functions/getName';

// const file = require('../../../assets/icons/512h/uploadicon512.png');

class PopularCandidate extends React.Component {
  state = { portrait: false };

  componentDidMount() {
    this.checkPortrait();
  }

  checkPortrait = () => {
    const { candidate } = this.props;
    const { id, userDetail } = candidate;
    const imgUrl = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(id, 10)}/profile/${userDetail.image}` : '/assets/icons/512h/uploadicon512.png';
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
    const { id, firstName, lastName, slug, userDetail } = candidate;
    const { portrait } = this.state;
    const imgUrl = userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(id, 10)}/profile/${userDetail.image}` : '/assets/icons/512h/uploadicon512.png';
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
          <Link to={`user/${slug}`} className="popularName">
            {`${firstName} ${lastName}`}
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