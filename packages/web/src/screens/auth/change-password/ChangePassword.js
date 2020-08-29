import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { passwordStrength } from '../utility-functions';
import * as actions from '../../../actions';
import { Form } from '../../../common';
import { changePassword } from '../helper-functions';

class ChangePassword extends Component {
  state = { redirect: false };

  handleChange = async (data) => {
    const { updateNav, token } = this.props;
    if (data.newPassword !== data.confirmPassword) {
      return { error: 'Passwords did not match' };
    }
    if (passwordStrength(data.newPassword) === 'weak') {
      return { error: 'Please enter a stronger password' };
    }
    const res = await changePassword({ ...data, token });
    if (res.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Your password is changed. Please login.', intent: 'success' } });
      this.setState({
        redirect: true,
      });
    }
    return res;
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    const { pForm } = this.props;
    return (
      <Form data={pForm} callback={this.handleChange} />
    );
  }
}

ChangePassword.propTypes = {
  token: PropTypes.string.isRequired,
  pForm: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(ChangePassword);
