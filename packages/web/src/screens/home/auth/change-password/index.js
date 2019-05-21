import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { changeForm, forgetForm } from './structure';
import ChangePassword from './ChangePassword';

class Reset extends Component {
  state = {}

  render() {
    const { type } = this.props;
    return (
      <div className="o-log-or-reg">
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Reset your password </p>
          </div>
          <ChangePassword pForm={type === 'change' ? changeForm : forgetForm} />
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Reset;
