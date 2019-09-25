import React, { Component } from 'react';
import PopularCandidate from './PopularCandidate';
import PropTypes from 'prop-types';

class Popular extends Component {
  state = {};

  render() {
    const { data } = this.props;
    // console.log(popular);
    return (
      <div className="popularContainer">
        <div className="popularHeader">
          <p>Connect with the best Mentors in the Planet</p>
        </div>
        <div className="popularCover">
          {
            data.map((candidate, index) => (
              <PopularCandidate key={index} candidate={candidate} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Popular;
