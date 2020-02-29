import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../helper-functions';
import { passwordStrength, emailValidator } from '../utility-functions';
import * as actions from '../../../actions';
import Register from './registration';

class Registration extends Component {
  state = { redirect: false };

  handleRegistration = async (data) => {
    const { updateNav } = this.props;
    if (!emailValidator(data.email)) {
      return { error: 'Please enter a valid email' };
    }
    if (passwordStrength(data.password) === 'weak') {
      return { error: 'Please enter a stronger password' };
    }
    if (data.password !== data.confirmPassword) {
      return { error: "Passwords don't match" };
    }
    const res = await register(data);
    if (res.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Registration successful. Please verify your email and login.', intent: 'success' } });
      this.setState({
        redirect: true,
      });
    }
    return res;
  }

  render() {
    const { redirect } = this.state;
    return (
      <div className="o-log-or-reg">
        {redirect && <Redirect to="/login" />}
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Create a Proper Class Account </p>
            <Link to="/login"><u>or login to your account</u></Link>
          </div>
          <Register handleRegistration={this.handleRegistration} />
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Registration);
