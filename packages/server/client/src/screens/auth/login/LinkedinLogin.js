import React from 'react';
import { Button } from '@blueprintjs/core';

class LinkedinLogin extends React.Component {
  state = {};

  responseLinkedin = (response) => {
    console.log(response);
  }

  render() {
    return (
      <Button
        onClick={this.requestLinkedin}
        className="linkedin-default"
        text="Sign in with linkedin"
        large
        style={{
          backgroundImage: `url('${null}')`,
          width: '100%',
        }}
      />
    );
  }
}

export default LinkedinLogin;
