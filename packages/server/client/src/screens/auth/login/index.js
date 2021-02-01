import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import Log from './login';
import GoogleLogin from './GoogleLogin';
import { login } from '../helper-functions';
import { Navbar } from '../../home/component'
import Footer from '../../../common/footer'

class Login extends Component {
  state = { redirect: false, slug: '', loading: false, showContent: false };

  componentDidMount() {
  this.setState({ showContent: true });
  }

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
    const { redirect, slug, loading, showContent } = this.state;
    // console.log('props in login page', this.props);
    return (
      <>
        <Navbar />
        <div className="o-log-or-reg">
          <div className="log-or-reg">
            <div className="reg-box-header">
              <h1>Welcome Back</h1>
            </div>
            {
              redirect || account.user ? <Redirect push to={`/dashboard/${slug || account.user.slug}`} /> : <Log loginHandler={this.loginHandler} />
            }
            <div className="auth-with-others">
              {typeof document !== 'undefined' ? <GoogleLogin loading={loading} googleLogin={this.googleLogin} /> : null}
            </div>
            <div className="auth-footer">
              <p className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
              <p className="register-link"> Don't have an account?
                <Link to="/register">Register</Link>
              </p>

            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Login.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Login);
