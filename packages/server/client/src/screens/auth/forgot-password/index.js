import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Forgot from './forget';
import { Navbar } from '../../home/component'
import Footer from '../../../common/footer'

class Forget extends Component {

  render() {
    return (
      <>
        <Navbar />
        <div className="o-log-or-reg">
          <div className="log-or-reg">
            <div className="pc-card">
              <div className="reg-box-header">
                <h1>Recover your password</h1>
              </div>
              <Forgot />
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

export default Forget;
