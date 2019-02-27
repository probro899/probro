import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Log from './login';

class Login extends Component {
  state = {}

  render() {
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p>Login to Proper Class</p>
          </div>
          <Log />
          <div className="footer">
            <p>
              Do not have an account?
              <Link to="/register"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
