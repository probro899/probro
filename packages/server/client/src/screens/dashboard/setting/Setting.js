import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../socket';
import * as actions from '../../../actions';
import BasicSettings from './BasicSettings';
import AdvancedSettings from './AdvancedSetting';


class Setting extends Component {
  state = {
    apis: {},
  }

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Settings' },
    });
  }

  render() {
    const { apis } = this.state;
    const { database, account, match } = this.props;
    const menu = match.path.split("/");
    const activeTab = menu[menu.length - 1]
    return (
      <div className="settings bro-right">
        <div className="setting-wrapper">
          <div className="setting-types">
            <Link
              to={`/dashboard/${match.params.id}/settings/basic`}
              className={activeTab === 'basic' ? 'active i-setting' : 'i-setting'}
            >
              General
            </Link>
            <Link
              to={`/dashboard/${match.params.id}/settings/advanced`}
              className={activeTab === 'advanced' ? 'active i-setting' : 'i-setting'}
            >
              Advanced
            </Link>
          </div>
          {activeTab === 'basic' && <BasicSettings apis={apis} account={account} database={database} />}
          {activeTab === 'advanced' && <AdvancedSettings apis={apis} database={database} account={account} />}
        </div>

      </div>
    );
  }
}

Setting.propTypes = {
  updateNav: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Setting);
