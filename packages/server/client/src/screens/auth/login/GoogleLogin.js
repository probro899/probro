import React from 'react';
import PropTypes from 'prop-types';
import { GOOGLE_SIGNIN_CLIENT_ID } from '../../../config';
// import { GoogleLogin as Googlelogin } from 'react-google-login';
// const { GoogleLogin } = typeof window === 'object' ? require('react-google-login') : {};
let GoogleLib;
class GoogleLoginComponent extends React.Component {
  state = { showGoogleBtn: false };

  componentDidMount() {
    console.log('login did mount called');
    GoogleLib = require('react-google-login');
    this.setState({ showGoogleBtn: true });
  }

  render() {
    const { googleLogin, loading } = this.props;
    const { showGoogleBtn } = this.state;
    return (
      showGoogleBtn ? (
        <GoogleLib.GoogleLogin
          clientId={GOOGLE_SIGNIN_CLIENT_ID}
          buttonText="Sign in with google"
          onSuccess={googleLogin}
          onFailure={googleLogin}
          disabled={loading}
          disabledStyle={{ cursor: 'not-allowed', opacity: 0.7 }}
          cookiePolicy="single_host_origin"
          className="google-default"
        />
      ) : null
    );
  }
}

GoogleLoginComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  googleLogin: PropTypes.func.isRequired,
};

export default GoogleLoginComponent;
