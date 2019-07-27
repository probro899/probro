import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import * as actions from '../../../../actions';
import Navbar from '../navbar';

const file = require('../../../../assets/icons/512h/uploadicon512.png');
const school = require('../../../../assets/icons/64w/school64.png');
const office = require('../../../../assets/icons/64w/office64.png');

class PublicProfile extends React.Component {
  state = {};

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: '' },
    });
  }

  render() {
    const { account, database } = this.props;
    let details = {};
    try {
      details = database.User.byId[account.user.id];
    } catch (e) {
      console.log(e);
    }
    return (
      <div>
        <Navbar />
        <div className="public-profile">
          <div className="cover-pic" />
          <div className="profilePic">
            <img src={file} alt="profile of the user" />
          </div>
          <div className="top-details">
            <span className="name">
              {details.middleName ? `${details.firstName} ${details.middleName} ${details.lastName}` : `${details.firstName} ${details.lastName}`}
            </span>
            <br />
            <span className="designation">Software Engineer at Somewhere</span>
            <br />
            <Icon icon="locate" />
            <span className="country"> Nepal</span>
          </div>
          <div className="bio">
            <p>
              &#34; Win or Learn &#34;
            </p>
          </div>
          <div className="education">
            <p className="p-top">
              <span>Education</span>
            </p>
            <div className="p-edu-list">
              <div className="p-edu-list-i">
                <img src={school} alt="school icon" />
                <p>
                  <span className="p-name-i">High School Study</span>
                  <br />
                  <span>Place Kathmandu</span>
                  <br />
                  <span className="p-timeline">2012-2018</span>
                </p>
              </div>
            </div>
          </div>
          <div className="experience">
            <p className="p-top">
              <span>Experience</span>
            </p>
            <div className="p-exp-list">
              <div className="p-exp-list-i">
                <img src={office} alt="school icon" />
                <p>
                  <span className="p-title-i">Software Engineer</span>
                  <br />
                  <span className="p-company-i">Proper Class</span>
                  <br />
                  <span className="p-timeline">2012-2018</span>
                  <br />
                  <span>Place Kathmandu</span>
                </p>
              </div>
            </div>
          </div>
          <div className="skills">
            <p className="p-top">
              <span>Skills</span>
            </p>
            <div className="skills-container">
              <span>
                Python
              </span>
              <span>
                Javascript
              </span>
              <span>
                React
              </span>
              <span>
                Node
              </span>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

PublicProfile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(PublicProfile);