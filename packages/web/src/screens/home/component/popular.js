import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Candidate = (props) => {
  const { candidate } = props;
  return (
    <div className="popular">
      <div className="popularImage">
        <img src={candidate.photo} alt={`candidate ${candidate.id}`} />
      </div>
      <div className="popularDesc">
        <p className="popularName">
          { candidate.name }
        </p>
        <p className="popularExpertize">
          { candidate.expertize }
        </p>
      </div>
    </div>
  );
};

Candidate.propTypes = {
  candidate: PropTypes.objectOf(PropTypes.any).isRequired,
};


class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = { popular: [] };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/popular').then((response) => {
      this.setState({ popular: response.data });
    });
  }

  render() {
    const { popular } = this.state;

    return (
      <div className="popularContainer">
        <div className="popularHeader">
          <p>Connect with the best Mentors in the Planet.</p>
        </div>
        <div className="popularCover">
          {
            popular.map(candidate => (
              <Candidate key={candidate.id} candidate={candidate} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Popular;
