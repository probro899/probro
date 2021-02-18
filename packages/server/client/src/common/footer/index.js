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
                We are a team of productivity experts. Proper Class is the mixture of an enthusiastic workforce that aims to be the face of the global IT industry. We are dedicated to apply technology to scale businesses thus making the growth of the industries possible and profitable. So far we have been successful to achieve and deliver the requirement of our clients. We not only provide services but our products have been benefiting the global education industry.
          </p>
            </div>
            <div>
              <h3>
                Company
          </h3>
              <ul>
                <li><Link to='/career'>Career</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li>  <Link to="/about">About Us</Link></li>
                <li><Link to="/services">Software Services</Link></li>
              </ul>

            </div>

            <div>
              <h3>
                Support
          </h3>
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
            @2020 Proper Class. All Rights Reserved.
        </div>
        </footer>

      </section>



    );
  }
}

export default Footer;
