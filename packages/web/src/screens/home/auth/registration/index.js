import React, { Component } from 'react';
import Register from './registration';

class Registration extends Component {
  state = {}

  render() {
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Create a Proper Class Account </p>
          </div>
          <Register />
        </div>
      </div>
    );
  }
}

export default Registration;
