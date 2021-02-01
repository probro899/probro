import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { getName } from '../../../common/utility-functions';
import client from '../../../socket';
import * as actions from '../../../actions';
import { Education, Experience, Skills, Bio, CoverPic, ProfilePic } from './components';
import { VerifiedBadge } from '../../../common/VerifiedBadge';

class Profile extends Component {
  state = {
    apis: {},
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Profile' },
    });
  }

  togglePopovers = (type) => {
    const { skillsEditPopover } = this.state;
    if (type === 'skills') {
      this.setState({
        skillsEditPopover: !skillsEditPopover,
      });
    }
  }

  render() {
    const {
      account,
      database, deleteDatabaseSchema, updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const { apis } = this.state;
    if (!account.user) {
      return <div />;
    }
    const user = database.User.byId[account.user.id];
    const userDetail = Object.values(database.UserDetail.byId).find(obj => {
      if (user.id === obj.userId) return obj;
    }) || {};
    return (
      <div className="profile bro-right">
        <div className="pc-profile-wrapper">
          <CoverPic
            account={account}
            userDetail={userDetail}
            apis={apis}
            updateDatabaseSchema={updateDatabaseSchema}
            addDatabaseSchema={addDatabaseSchema}
          />
          <div className="profile-main-wrapper">
            <div className="top-section-wrapper">
              <div className="p-image-wrap">
                <ProfilePic
                  account={account}
                  apis={apis}
                  userDetail={userDetail}
                  updateDatabaseSchema={updateDatabaseSchema}
                  addDatabaseSchema={addDatabaseSchema}
                />
                <div className="empty-div"></div>
              </div>
              <div className="top-details">
                <h2 className="name">
                  {getName(user)} < VerifiedBadge />
                </h2>
                <p className="mentor-position">{userDetail.headLine}</p>
                <Icon icon="locate" />
                <span className="country">
                  {' '}
                  {userDetail.address}
                </span>
              </div>
            </div>
            <Bio
              account={account}
              apis={apis}
              database={database}
              updateDatabaseSchema={updateDatabaseSchema}
              addDatabaseSchema={addDatabaseSchema}
              deleteDatabaseSchema={deleteDatabaseSchema}
            />
            <Experience
              apis={apis}
              database={database}
              account={account}
              updateDatabaseSchema={updateDatabaseSchema}
              addDatabaseSchema={addDatabaseSchema}
              deleteDatabaseSchema={deleteDatabaseSchema}
            />
            <Education
              apis={apis}
              database={database}
              account={account}
              updateDatabaseSchema={updateDatabaseSchema}
              addDatabaseSchema={addDatabaseSchema}
              deleteDatabaseSchema={deleteDatabaseSchema}
            />

            <Skills
              account={account}
              apis={apis}
              skills={database.UserSkill}
              updateDatabaseSchema={updateDatabaseSchema}
              addDatabaseSchema={addDatabaseSchema}
            />
          </div>
        </div>
      </div >
    );
  }
}

Profile.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Profile);
