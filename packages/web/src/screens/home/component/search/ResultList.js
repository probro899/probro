import React from 'react';
import { Link } from 'react-router-dom';

const icon = require('../../../../assets/icons/64w/uploadicon64.png');

class ResultList extends React.Component {
  state={};

  render() {
    return (
      <div className="result-list">
        <p className="label">Showing 9888 results</p>
        <div className="i-result">
          <div className="img-con">
            <img alt="profile thumnail" src={icon} />
          </div>
          <div className="desc-con">
            <p className="name">
              <Link to="/user/1">
                Conor Mcgregor
              </Link>
            </p>
            <p>MMA athlete at Ultimate Fighting Championship</p>
            <p className="location">Ireland</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultList;
