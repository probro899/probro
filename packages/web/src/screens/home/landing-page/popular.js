import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopularCandidate from './PopularCandidate';

class Popular extends Component {
  state = {};

  render() {
    const { data } = this.props;
    return (
      <div className="popularContainer">
        <div className="popularHeader">
          <p>Connect with the best Mentors in the Planet</p>
        </div>
        <div className="popularCover">
          {
            data.map(candidate => (
              <PopularCandidate key={candidate.user.id} candidate={candidate} />
            ))
          }
        </div>
      </div>
    );
  }
}

Popular.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Popular;
