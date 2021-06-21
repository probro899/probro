import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  state = {};

  render() {
    return (
      <section>
        <div id="bottom">
          <div className="container">
            <div>
              <h3 className="properClass">Proper Class</h3>
              <p>
                We are a team of productivity experts. 
                Proper Class is an enthusiastic workforce that 
                aims to be the face of the global education industry. 
                We are dedicated to exploit technology to make practical education accessible 
                to everyone.
              </p>
            </div>
            <div>
              <h3>Company</h3>
              <ul>
                <li><Link to="/career">Career</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Software Services</Link></li>
              </ul>
            </div>
            <div>
              <h3>Support</h3>
              <ul>
                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link to="/report">Report</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/business">Business Enquiry</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            &copy; 2018 - {new Date().getFullYear()} Proper Class. All Rights Reserved.
          </div>
        </footer>
      </section>
    );
  }
}

export default Footer;
