import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Spinner } from '@blueprintjs/core';
import Login from '../login';
import { ENDPOINT } from '../../../../config';
import NotifyBar from '../../../../common/NotifyBar';

class VerifyEmail extends React.Component {
  state={
    emailVerification: null,
    loading: true,
  };

  async componentDidMount() {
    // console.log('hello there coming');
    const { match } = this.props;
    try {
      const res = await axios.get(`${ENDPOINT}/auth/email-verification?token=${match.params.token}`);
      if (res.status === 200) {
        this.setState({ emailVerification: true, loading: false });
      }
    } catch (e) {
      this.setState({ emailVerification: false, loading: false });
    }
  }

  render() {
    const { emailVerification, loading } = this.state;
    return (
      <div>
        {loading ? <Spinner size={30} />
          : (
            <div>
              <NotifyBar
                message={emailVerification ? 'You have been verified' : 'Verification failed'}
                intent={emailVerification ? 'success' : 'danger'}
              />
              <div style={{ marginTop: 50 }}>
                {emailVerification && <Login />}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VerifyEmail;
