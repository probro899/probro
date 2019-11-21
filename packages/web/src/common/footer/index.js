import React from 'react';

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
                <div>
                  <span>About Us</span>
                </div>
                <div>
                  <span>Careers</span>
                </div>
                <div>
                  <span>Help</span>
                </div>
                <div>
                  <span>Support</span>
                </div>
              </div>
            </div>
            <div className="foot-left-one">
              <div className="one-content">
                <div>
                  <span>Advertising</span>
                </div>
                <div>
                  <span>Software solution</span>
                </div>
                <div>
                  <span>Partnership</span>
                </div>
                <div>
                  <span>Mobile</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <div className="right-content">
              <div>
                <span>Privacy</span>
              </div>
              <div>
                <span>Terms and conditions</span>
              </div>
              <div>
                <span>Safety center</span>
              </div>
              <div>
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
