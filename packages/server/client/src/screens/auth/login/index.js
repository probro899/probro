import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import Log from './login';
import GoogleLogin from './GoogleLogin';
import { login } from '../helper-functions';

class Login extends Component {
  state = { redirect: false, slug: '', loading: false };

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
    const { updateNav } = this.props;
    this.setState({ loading: true });
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
      this.setState({ loading: false });
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Could not login with google', intent: 'danger' } });
    }
  }

  render() {
    const { account } = this.props;
    const { redirect, slug, loading } = this.state;
    // console.log('props in login page', this.props);
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p>Login to Proper Class</p>
            <Link to="/register"><u>or create an account</u></Link>
          </div>
          {
            redirect || account.user ? <Redirect push to={`/dashboard/${slug || account.user.slug}`} /> : <Log loginHandler={this.loginHandler} />
          }
          <div className="auth-with-others">
            {typeof document !== 'undefined' ? <GoogleLogin loading={loading} googleLogin={this.googleLogin} /> : null}
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
