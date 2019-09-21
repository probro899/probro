import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import { Education, Experience, Bio, CoverPic, ProfilePic } from './components';
import { PopoverForm } from '../../../../components';
import { skillsSchema } from './structure';

class Profile extends Component {
  state = {
    skillsEditPopover: false,
    apis: {},
  };

  async componentWillMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Profile' },
    });
  }

  editSkills = (data) => {
    // console.log(data);
  }

  togglePopovers = (type) => {
    const { skillsEditPopover } = this.state;
    if (type === 'skills') {
      this.setState({
        skillsEditPopover: !skillsEditPopover,
      });
    }
  }

  fileOnchange = (file) => {
    // console.log('file is here do what you want', file);
  }

  render() {
    const { account, database } = this.props;
    const { skillsEditPopover, apis } = this.state;
    if (!account.user) {
      return <div />;
    }
    const { user } = account;
    let userDetail;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (obj.userId === user.id) {
        userDetail = obj;
      }
    });
    return (
      <div className="profile bro-right">
        <CoverPic account={account} userDetail={userDetail} apis={apis} />
        <ProfilePic account={account} apis={apis} userDetail={userDetail} />
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
        <Bio apis={apis} />
        <Education apis={apis} />
        <Experience apis={apis} />
        <div className="skills">
          <PopoverForm
            isOpen={skillsEditPopover}
            structure={skillsSchema}
            callback={this.editSkills}
            onClose={() => this.togglePopovers('skills')}
          />
          <p className="p-top">
            <span>Skills</span>
            <Icon icon="plus" onClick={() => this.togglePopovers('skills')} />
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
