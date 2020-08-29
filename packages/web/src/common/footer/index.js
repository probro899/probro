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
                <Link to="/career" className="pc-foot-link">
                  <span>Careers</span>
                </Link>
                <Link to="/support" className="pc-foot-link">
                  <span>Support</span>
                </Link>
              </div>
            </div>
            <div className="foot-left-one">
              <div className="one-content">
                <Link to="/business" className="pc-foot-link">
                  <span>Business Enquiry</span>
                </Link>
                <Link to="/services" className="pc-foot-link">
                  <span>Software Services</span>
                </Link>
                <Link to="/privacy-policy" className="pc-foot-link">
                  <span>Privacy Policy</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="right-content">
              <Link to="/terms-and-conditions" className="pc-foot-link">
                <span>Terms and Conditions</span>
              </Link>
              <Link to="/report" className="pc-foot-link">
                <span>Report</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="pc-cr-container">
          <p>© 2015 - 2019 Proper Class Inc.</p>
        </div>
      </div>
    );
  }
}

export default Footer;
