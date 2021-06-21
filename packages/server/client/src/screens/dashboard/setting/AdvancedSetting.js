/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SwitchButton } from '../../../common/Form/SwitchButton';
import Organization from './organization';

class AdvancedSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mentor: false };
  }

  componentDidMount() {
    const { account, UserDetail } = this.props;
    Object.values(UserDetail.byId).map((obj) => {
      if (account.user.id === obj.userId && obj.type === 'mentor') {
        this.setState({ mentor: true });
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
      this.setState({ mentor: !mentor });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { mentor } = this.state;
    return (
      <div className="container-settings">
        <div className="switch-adv-con">
          <h3>Account Type:</h3>
          <div className="pc-switch-wrapper">
            <p>Mentor Account</p>
            <SwitchButton
              onChange={this.switchUser}
              checked={mentor}
            />
          </div>
        </div>
        <Organization {...this.props} />
      </div>
    );
  }
}

AdvancedSettings.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ account, database }) => ({ account, UserDetail: database.UserDetail });
export default connect(mapStateToProps)(AdvancedSettings);
