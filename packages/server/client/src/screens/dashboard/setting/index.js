import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../socket';
import * as actions from '../../../actions';
import BasicSettings from './basic-settings';
import AdvancedSettings from './AdvancedSetting';

class Setting extends Component {
  state = { apis: {} };

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    this.setState({ apis });
    updateNav({ schema: 'sideNav', data: { name: 'Settings' } });
  }

  render() {
    const { apis } = this.state;
    const { database, account, match, addDatabaseSchema } = this.props;
    const menu = match.path.split("/");
    const activeTab = menu[menu.length - 1];
    return (
      <div className="settings bro-right">
        <div className="setting-wrapper">
          <div className="setting-types">
            <NavLink to={`/dashboard/${match.params.id}/settings/basic`} className="i-setting">
                General
            </NavLink>
            <NavLink className="i-setting" to={`/dashboard/${match.params.id}/settings/advanced`}>
                Advanced
            </NavLink>
          </div>
          {activeTab === 'basic' && <BasicSettings apis={apis} account={account} database={database} />}
          {activeTab === 'advanced' && <AdvancedSettings match={match} apis={apis} database={database} account={account} addDatabaseSchema={addDatabaseSchema}/>}
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
