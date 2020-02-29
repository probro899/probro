import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Form } from '../../../common';
import { emailValidator } from '../utility-functions';
import forgotForm from './structure';
import { forgot } from '../helper-functions';

class Forgot extends Component {
  state = {}

  forgotPassword = async (data) => {
    if (!emailValidator(data.email)) {
      return { error: 'Please enter a valid email' };
    }
    const { updateNav } = this.props;
    const res = await forgot(data);
    if (res.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Click the link in the email and recover your password.', intent: 'success' } });
    }
    return res;
  }

  render() {
    return (
      <Form data={forgotForm} callback={this.forgotPassword} />
    );
  }
}

Forgot.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Forgot);
