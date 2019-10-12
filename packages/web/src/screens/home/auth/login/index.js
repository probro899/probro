import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Log from './login';
import GoogleLogin from './GoogleLogin';

class Login extends Component {
  state = {};

  render() {
    const { account } = this.props;
    console.log("login", account, this.props);
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p>Login to Proper Class</p>
            <Link to="/register"><u>or create an account</u></Link>
          </div>
          {/* just trying to redirect incase of logged in */}
          {
            account.sessionId ? <Redirect push to={`/${account.sessionId}/profile`} /> : <Log />
          }
          <div className="auth-with-others">
            <GoogleLogin />
          </div>
          <div className="auth-footer">
            <p>
              <br />
              <Link to="/forgot-password"><u>Forgot your password?</u></Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(Login);
