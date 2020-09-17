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
          <p>Featured Mentors at Proper Class</p>
        </div>
        <div className="popularCover">
          {
            data.map(candidate => (
              <PopularCandidate key={candidate.id} candidate={candidate} />
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
