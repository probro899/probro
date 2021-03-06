import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin as Googlelogin } from 'react-google-login';

class GoogleLogin extends React.Component {
  state = {};

  render() {
    const { googleLogin, loading } = this.props;
    return (
      <Googlelogin
        clientId="326098273643-s03gfvahj2tvlkb3fvr487o5nep2fp0f.apps.googleusercontent.com"
        buttonText="Sign in with google"
        onSuccess={googleLogin}
        onFailure={googleLogin}
        disabled={loading}
        disabledStyle={{ cursor: 'not-allowed', opacity: 0.7 }}
        cookiePolicy="single_host_origin"
        className="google-default"
      />
    );
  }
}

GoogleLogin.propTypes = {
  loading: PropTypes.bool.isRequired,
  googleLogin: PropTypes.func.isRequired,
};

export default GoogleLogin;
