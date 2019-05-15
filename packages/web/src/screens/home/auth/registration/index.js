import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Register from './registration';

class Registration extends Component {
  state = {}

  render() {
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Create a Proper Class Account </p>
            <Link to="/login"><u>or login to your account</u></Link>
          </div>
          <Register />
        </div>
      </div>
    );
  }
}

export default Registration;
