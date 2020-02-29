import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeForm, forgetForm } from './structure';
import ChangePassword from './ChangePassword';

class Reset extends Component {
  state = {}

  render() {
    const { type, match } = this.props;
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Reset your password </p>
            <Link to="/login"><u>or Login</u></Link>
          </div>
          <ChangePassword token={match.params.token} pForm={type === 'change' ? changeForm : forgetForm} />
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default Reset;
