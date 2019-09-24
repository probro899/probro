import React, { Component } from 'react';

const file = require('../../../assets/screenshot.png');

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="banner-container">
        <div className="banner-head">
          <p>How it works</p>
        </div>
        <div className="banners">
          <div className="banner">
            <div className="banner-image">
              <img src={file} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Connect</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Search for mentor in the site</li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-image">
              <img src={file} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Mentorship</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Search for mentor in the site</li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-image">
              <img src={file} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Learning</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Search for mentor in the site</li>
                <li>Search</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
