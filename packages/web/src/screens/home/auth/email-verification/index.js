import React from 'react';
import axios from 'axios';

class VerifyEmail extends React.Component {
  state={ emailVerification: null };

  async componentWillMount() {
    const token = this.props.match.params.token;
    const res = await axios.get(`http://192.168.1.66:4001/auth/email-verification?token=${token}`);
    if (res.status === 200) {
      this.setState({ emailVerification: res.data });
    }
  }

  render() {
    // console.log('emailVerification status', this.state.emailVerification);
    return (
      <div>
        <h1>Email verification Component goes here</h1>
      </div>
    );
  }
}
export default VerifyEmail;
