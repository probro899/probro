import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import Log from './login';
import GoogleLogin from './GoogleLogin';
import { login } from '../helper-functions';

class Login extends Component {
  state = { redirect: false, slug: '' };

  loginHandler = async (data) => {
    const { updateNav } = this.props;
    const res = await login(data);
    if (res.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Login successful. Welcome to Dashboard.', intent: 'success' } });
      this.setState({
        redirect: true,
        slug: res.data.slug,
      });
    }
    return res;
  }

  googleLogin = async (response) => {
    console.log('Google resposne', response);
    const { updateNav } = this.props;
    try {
      const res = await login({ loginType: 'google', record: response });
      if (res.response === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Login successful. Welcome to Dashboard.', intent: 'success' } });
        this.setState({
          redirect: true,
          slug: res.data.slug,
        });
      }
      return res;
    } catch (e) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Could not login with google', intent: 'danger' } });
    }
  }

  render() {
    const { account } = this.props;
    const { redirect, slug } = this.state;
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p>Login to Proper Class</p>
            <Link to="/register"><u>or create an account</u></Link>
          </div>
          {
            redirect || account.user ? <Redirect push to={`/${slug || account.user.slug}/profile`} /> : <Log loginHandler={this.loginHandler} />
          }
          <div className="auth-with-others">
            <GoogleLogin googleLogin={this.googleLogin} />
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
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Login);
