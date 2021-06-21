import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeForm, forgetForm } from './structure';
import ChangePassword from './ChangePassword';
import { Navbar } from '../../home/component'
import Footer from '../../../common/footer'

class Reset extends Component {
  state = {}

  render() {
    const { type, match } = this.props;
    return (
      <>
        <Navbar />
        <div className="o-log-or-reg">
          <div className="log-or-reg">
            <div className="pc-card">
              <div className="reg-box-header">
                <div className="reg-box-header">
                  <h1>Reset your password</h1>
                </div>
              </div>
              <ChangePassword token={match.params.token} pForm={type === 'change' ? changeForm : forgetForm} />
              <p className="login-in-link">
                Already have an account?
              <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Reset.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default Reset;
