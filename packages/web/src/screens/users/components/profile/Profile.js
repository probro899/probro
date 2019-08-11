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
    console.log(data);
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
    const { account, database } = this.props;
    const { skillsEditPopover, apis } = this.state;
    let details = {};
    try {
      details = database.User.byId[account.user.id];
    } catch (e) {
      console.log(e);
    }
    return (
      <div className="profile">
        <CoverPic account={account} />
        <ProfilePic account={account} />
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
