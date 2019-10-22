import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import client from '../../../socket';
import * as actions from '../../../actions';
import { Education, Experience, Skills, Bio, CoverPic, ProfilePic } from './components';

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
    const { user } = account;
    // console.log('cover page', account);
    return (
      <div className="profile bro-right">
        <CoverPic
          account={account}
          userDetail={user.userDetails}
          apis={apis}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
        />
        <ProfilePic
          account={account}
          apis={apis}
          userDetail={user.userDetails}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
        />
        <div className="top-details">
          <span className="name">
            {user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`}
          </span>
          <br />
          <span className="designation">Software Engineer at Somewhere</span>
          <br />
          <Icon icon="locate" />
          <span className="country"> Nepal</span>
        </div>
        <Bio
          account={account}
          apis={apis}
          database={database}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
          deleteDatabaseSchema={deleteDatabaseSchema}
        />
        <Education apis={apis} database={database} account={account} />
        <Experience apis={apis} database={database} account={account} />
        <Skills
          account={account}
          apis={apis}
          skills={database.UserSkill}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
        />
      </div>
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