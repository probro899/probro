import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotifyBar from '../../../common/NotifyBar';
import Register from './registration';

class Registration extends Component {
  state = {
    notify: false,
  }

  notify = () => {
    this.setState({
      notify: true,
    });
  }

  closeNotify = () => {
    this.setState({
      notify: false,
    });
  }

  render() {
    const { notify } = this.state;
    return (
      <div className="o-log-or-reg">
        {notify && <NotifyBar onClose={this.closeNotify} message="Please verify your email" intent="success" />}
        <div className="log-or-reg">
          <div className="reg-box-header">
            <p> Create a Proper Class Account </p>
            <Link to="/login"><u>or login to your account</u></Link>
          </div>
          <Register notify={this.notify} />
        </div>
      </div>
    );
  }
}

export default Registration;
