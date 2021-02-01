import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../helper-functions';
import { passwordStrength, emailValidator } from '../utility-functions';
import * as actions from '../../../actions';
import Register from './registration';
import { Navbar } from '../../home/component';
import Footer from '../../../common/footer';


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
     <>
        <Navbar />
        <div className="o-log-or-reg">
          {redirect && <Redirect to="/login" />}
          <div className="log-or-reg">
            <div className="reg-box-header">
              <h1> Create Account </h1>
            </div>
            <Register handleRegistration={this.handleRegistration} />
            <p className="login-in-link">
              Already have an account?
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Registration.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Registration);
