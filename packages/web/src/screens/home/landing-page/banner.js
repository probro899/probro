import React, { Component } from 'react';

const idx = require('../../../assets/index.png');
const cls = require('../../../assets/class.png');
const inst = require('../../../assets/insight.png');

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
              <img src={idx} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Connect</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Sign up as Mentor or Mentee</li>
                <li>Find Mentors</li>
                <li>Send Connection request</li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-image">
              <img src={cls} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Manage</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Update your profile</li>
                <li>Create classrooms</li>
                <li>Create Content</li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="banner-image">
              <img src={inst} alt="banner here" />
            </div>
            <div className="banner-title">
              <p>Mentorship</p>
            </div>
            <div className="banner-description">
              <ul>
                <li>Manage your subject</li>
                <li>Track your progress</li>
                <li>Communicate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
