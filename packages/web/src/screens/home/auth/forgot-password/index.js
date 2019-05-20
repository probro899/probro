import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forgot from './forget';

class Forget extends Component {
  state = {}

  render() {
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p>Recover your password</p>
            <Link to="/login"><u>or login to your account</u></Link>
          </div>
          <Forgot />
        </div>
      </div>
    );
  }
}

export default Forget;
