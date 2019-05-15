import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { FileInput } from '../../../common';

const file = require('../../../assets/imageUploadIcon.png');

class Profile extends Component {
  state = {};

  componentWillMount() {
    const { mainHandler } = this.props;
    mainHandler('user');
  }

  onUploadImage = () => {
    const { mainHandler } = this.props;
    mainHandler('updateProfilePicture');
  };

  render() {
    console.log('Main value in props', this.props);
    const { main, updateMainValue } = this.props;
    const userAttributes = [
      { firstName: 'First Name' },
      { lastName: 'Last Name' },
      { email: 'Email' },
    ];
    return (
      <div className="profile">
        <div className="profilePic">
          <img src={file} alt="profile of the user" />
          <FileInput schema="user" field="profilePicture" _action={updateMainValue} lastAction={this.onUploadImage} {...this.props} />
        </div>
        <div className="profileDetails">
          {
            userAttributes.map((obj) => {
              return (
                <div className="detailElement" key={Object.keys(obj)[0]}>
                  <span style={{ fontSize: 18, color: 'brown' }}>{Object.values(obj)[0]}</span>
                  <span style={{ fontSize: 17 }}>{main.user[Object.keys(obj)[0]]}</span>
                </div>
              );
            })
          }
        </div>
        {/* {!main.user.token && <Redirect push to="/" />} */}
      </div>
    );
  }
}

Profile.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  updateMainValue: PropTypes.func.isRequired,
  mainHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Profile);
