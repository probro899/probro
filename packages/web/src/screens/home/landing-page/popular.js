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
    this.state = {
      popular: [
        { id: 1, name: 'Nabin Bhusal', expertize: 'Business', photo: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' },
        { id: 2, name: 'Bhagya Sah', expertize: 'Software Engineer', photo: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1276&q=80' },
      ],
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/popular').then((response) => {
      this.setState({ popular: response.data });
    });
  }

  render() {
    const { popular } = this.state;
    // console.log(popular);
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
