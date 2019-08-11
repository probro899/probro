import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import * as actions from '../../../../actions';
import { FileInput } from '../../../../common';

const file = require('../../../../assets/icons/512h/uploadicon512.png');
const school = require('../../../../assets/icons/64w/school64.png');
const office = require('../../../../assets/icons/64w/office64.png');

class Profile extends Component {
  state = {};

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'sideNav',
      data: { name: 'Profile' },
    });
  }

  onUploadImage = () => {
    // this is to be handled
  };

  fileOnchange = (file) => {
    console.log('file is here do what you want', file);
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
      <div className="profile">
        <div className="cover-pic">
          <div className="edit-cover">
            <span>Edit </span>
            <Icon icon="edit" color="white" className="edit-icon" />
          </div>
        </div>
        <div className="profilePic">
          <img src={file} alt="profile of the user" />
          <FileInput fileComponent={<Icon icon="plus" intent="primary" iconSize="30" color="white" fileOnchange={this.fileOnchange} /> } />
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
            <Icon icon="plus" />
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
              <p><Icon icon="edit" /></p>
            </div>
          </div>
        </div>
        <div className="experience">
          <p className="p-top">
            <span>Experience</span>
            <Icon icon="plus" />
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
              <p><Icon icon="edit" /></p>
            </div>
          </div>
        </div>
        <div className="skills">
          <p className="p-top">
            <span>Skills</span>
            <Icon icon="plus" />
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
    );
  }
}

Profile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Profile);
