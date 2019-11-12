import React from 'react';
import { GoogleLogin as Googlelogin } from 'react-google-login';
import login from '../helper-functions/login';

class GoogleLogin extends React.Component {
  state = {};

  responseGoogle = async (response) => {
    // console.log(response);
    try {
      await login({ loginType: 'google', record: response.profileObj });
      // console.log('google login response', googleRes);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <Googlelogin
        clientId="326098273643-s03gfvahj2tvlkb3fvr487o5nep2fp0f.apps.googleusercontent.com"
        buttonText="Sign in with google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy="single_host_origin"
        className="google-default"
      />
    );
  }
}

export default GoogleLogin;
