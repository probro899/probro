import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  state = {};

  render() {
    return (
      <div className="footer">
        <div className="pc-logo">
          <span>Proper Class</span>
        </div>
        <div className="left-right-container">
          <div className="footer-left">
            <div className="foot-left-one">
              <div className="one-content">
                <Link to="/about" className="pc-foot-link">
                  <span>About Us</span>
                </Link>
                <div className="pc-foot-link">
                  <span>Careers</span>
                </div>
                <div className="pc-foot-link">
                  <span>Help</span>
                </div>
                <div className="pc-foot-link">
                  <span>Support</span>
                </div>
              </div>
            </div>
            <div className="foot-left-one">
              <div className="one-content">
                <div className="pc-foot-link">
                  <span>Advertising</span>
                </div>
                <div className="pc-foot-link">
                  <span>Software solution</span>
                </div>
                <div className="pc-foot-link">
                  <span>Partnership</span>
                </div>
                <div className="pc-foot-link">
                  <span>Mobile</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="right-content">
              <div className="pc-foot-link">
                <span>Privacy</span>
              </div>
              <div className="pc-foot-link">
                <span>Terms and conditions</span>
              </div>
              <div className="pc-foot-link">
                <span>Safety center</span>
              </div>
              <div className="pc-foot-link">
                <span>Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
