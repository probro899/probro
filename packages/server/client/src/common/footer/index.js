import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  state = {};

  render() {
    return (
      // <div className="footer">
      //   <div className="pc-logo">
      //     <span>Proper Class</span>
      //   </div>
      //   <div className="left-right-container">

      //       <div className="foot-left-one">
      //         <div className="one-content">
      //           <Link to="/about" className="pc-foot-link">
      //             <span>About Us</span>
      //           </Link>
      //           <Link to="/career" className="pc-foot-link">
      //             <span>Careers</span>
      //           </Link>
      //           <Link to="/support" className="pc-foot-link">
      //             <span>Support</span>
      //           </Link>
      //         </div>

      //       <div className="foot-left-one">
      //         <div className="one-content">
      //           <Link to="/business" className="pc-foot-link">
      //             <span>Business Enquiry</span>
      //           </Link>
      //           <Link to="/services" className="pc-foot-link">
      //             <span>Software Services</span>
      //           </Link>
      //           <Link to="/privacy-policy" className="pc-foot-link">
      //             <span>Privacy Policy</span>
      //           </Link>
      //         </div>
      //       </div>

      //     </div>
      //     <div className="footer-right">
      //       <div className="right-content">
      //         <Link to="/terms-and-conditions" className="pc-foot-link">
      //           <span>Terms and Conditions</span>
      //         </Link>
      //         <Link to="/report" className="pc-foot-link">
      //           <span>Report</span>
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      <section>
        <div id="bottom">
          <div className="container">
            <div>
              {/* <img className="footerLogo" width={200} alt="Proper Class Logo" src=".././assets/graphics/realLogo.png" /> */}
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
            {/* <div>
          <h3>
              Procedures
          </h3>    
              <ul>
                  <li>Methodology</li>
                  <li>Quality Process</li>
              </ul>
        
         </div> */}
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
