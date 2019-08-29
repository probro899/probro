import React from 'react';
import { GoogleLogin as Googlelogin } from 'react-google-login';

class GoogleLogin extends React.Component {
  state = {};

  responseGoogle = (response) => {
    console.log(response);
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
