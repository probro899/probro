/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';

class AdvancedSettings extends React.Component {
  state={
    mentor: false,
  };

  componentDidMount() {
    const { account, database } = this.props;
    console.log('check database', database);
    database.UserDetail.allIds.map((obj) => {
      if (account.user.id === database.UserDetail.byId[obj].userId && database.UserDetail.byId[obj].type === 'mentor') {
        this.setState({
          mentor: true,
        });
      }
    });
  }

  switchUser = async () => {
    const { apis, account } = this.props;
    const { mentor } = this.state;
    try {
      await apis.updateUserDetails({
        userId: account.user.id,
        type: mentor ? 'mentee' : 'mentor',
      });
      this.setState({
        mentor: !mentor,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { mentor } = this.state;
    return (
      <div className="container-settings">
        <div className="switch-adv-con">
          <p>
            Change your profile to mentor
            <br />
            and help people learn with your knowledge base.
            <br />
            Be a part to educate the world.
          </p>
          <Switch
            onChange={this.switchUser}
            className="switch-button"
            checked={mentor}
            large
            innerLabel="Mentor"
          />
        </div>
      </div>
    );
  }
}

AdvancedSettings.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdvancedSettings;
