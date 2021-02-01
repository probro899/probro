import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../actions';
import { ENDPOINT } from '../../../config';
import { Spinner } from '../../../common';

class VerifyEmail extends React.Component {
  state={
    emailVerified: false,
    loading: true,
  };

  async componentDidMount() {
    const { match, updateNav } = this.props;
    try {
      const res = await axios.post(`${ENDPOINT}/auth/email-verification`, {token: match.params.token});
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Email is verified. Please login.', intent: 'success' } });
        this.setState({ emailVerified: true, loading: false });
      }
    } catch (e) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Could not verify your email.', intent: 'danger' } });
      this.setState({ emailVerified: false, loading: false });
    }
  }

  render() {
    const { emailVerified, loading } = this.state;
    if (loading) return <Spinner />;
    if (emailVerified) return <Redirect to="/login" />;
    return <Redirect to="/registration" />;
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(VerifyEmail);
