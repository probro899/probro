import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin as Googlelogin } from 'react-google-login';

class GoogleLogin extends React.Component {
  state = {};

  render() {
    const { googleLogin } = this.props;
    return (
      <Googlelogin
        clientId="326098273643-s03gfvahj2tvlkb3fvr487o5nep2fp0f.apps.googleusercontent.com"
        buttonText="Sign in with google"
        onSuccess={googleLogin}
        onFailure={googleLogin}
        cookiePolicy="single_host_origin"
        className="google-default"
      />
    );
  }
}

GoogleLogin.propTypes = {
  googleLogin: PropTypes.func.isRequired,
};

export default GoogleLogin;
