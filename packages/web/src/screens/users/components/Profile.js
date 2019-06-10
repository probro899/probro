import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { FileInput } from '../../../common';

const file = require('../../../assets/imageUploadIcon.png');

class Profile extends Component {
  state = {};

  onUploadImage = () => {
    // this is to be handled
  };

  render() {
    const { account, database } = this.props;
    let details = {};
    try {
      details = database.User.byId[account.user.id];
    } catch (e) {
      console.log(e);
    }
    const userAttributes = [
      { firstName: 'First Name' },
      { lastName: 'Last Name' },
      { email: 'Email' },
    ];
    return (
      <div className="profile">
        <div className="profilePic">
          <img src={file} alt="profile of the user" />
          <FileInput />
        </div>
        <div className="profileDetails">
          {
            userAttributes.map((obj) => {
              return (
                <div className="detailElement" key={Object.keys(obj)[0]}>
                  <span style={{ fontSize: 18, color: 'brown' }}>{Object.values(obj)[0]}</span>
                  <span style={{ fontSize: 17 }}>{details[Object.keys(obj)[0]]}</span>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Profile);
