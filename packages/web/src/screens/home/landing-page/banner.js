import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosLogIn, IoIosSearch, IoIosCreate, IoIosPersonAdd, IoMdInformationCircleOutline } from 'react-icons/io';
import { MdContentPaste, MdScreenShare, MdGroupWork, MdArtTrack } from 'react-icons/md';
import * as actions from '../../../actions';

const idx = require('../../../assets/index.png');
const cls = require('../../../assets/class.png');
const inst = require('../../../assets/insight.png');

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { account } = this.props;
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
            <div className="banner-content">
              <div className="banner-title">
                <p>Connect with the Mentors</p>
              </div>
              <div className="banner-description">
                <div>
                  <p>
                    <Link to={account.user ? '#' : '/register'}>
                      <IoIosLogIn color="#1d4354" size={22} />
                    </Link>
                    {' '}
                    Sign up to create your profile and own a dashboard.
                  </p>
                  <p>
                    <IoIosSearch color="#1d4354" size={22} />
                    {' '}
                    Find mentors using the search feature as your interest.
                  </p>
                  <p>
                    <IoIosPersonAdd color="#1d4354" size={22} />
                    {' '}
                    Send Connection request to the mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="banner middle">
            <div className="banner-content">
              <div className="banner-title">
                <p>Manage your profile and start project</p>
              </div>
              <div className="banner-description">
                <div>
                  <p>
                    <IoMdInformationCircleOutline color="#1d4354" size={22} />
                    {' '}
                    Update your profile, fill out your education and experience
                  </p>
                  <p>
                    <IoIosCreate color="#1d4354" size={22} />
                    {' '}
                    Create classrooms and organize the projects with tasks
                  </p>
                  <p>
                    <MdContentPaste color="#1d4354" size={22} />
                    {' '}
                    Create content, write blogs and use drawing board as well.
                  </p>
                </div>
              </div>
            </div>
            <div className="banner-image">
              <img src={cls} alt="banner here" />
            </div>
          </div>
          <div className="banner">
            <div className="banner-image">
              <img src={inst} alt="banner here" />
            </div>
            <div className="banner-content">
              <div className="banner-title">
                <p>Mentorship</p>
              </div>
              <div className="banner-description">
                <div>
                  <p>
                    <MdGroupWork color="#1d4354" size={22} />
                    {' '}
                    Strengthen mentor-mentee relationship
                  </p>
                  <p>
                    <MdArtTrack color="#1d4354" size={22} />
                    {' '}
                    Track your progress, communicate, generate report
                  </p>
                  <p>
                    <MdScreenShare color="#1d4354" size={22} />
                    {' '}
                    Read, learn and contribute
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ account }) => { return { account }; };
export default connect(mapStateToProps, { ...actions })(Banner);
