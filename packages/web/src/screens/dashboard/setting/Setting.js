import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../socket';
import * as actions from '../../../actions';
import BasicSettings from './BasicSettings';
import AdvancedSettings from './AdvancedSetting';


class Setting extends Component {
  state = {
    activeTab: 'basic',
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

  handleClick = (name) => {
    this.setState({ activeTab: name });
  };

  render() {
    const { activeTab, apis } = this.state;
    const { database, account } = this.props;
    return (
      <div className="settings bro-right">
        <div className="setting-types">
          <div
            onClick={() => this.handleClick('basic')}
            tabIndex={0}
            onKeyDown={() => this.handleClick('basic')}
            role="menuitem"
            className={activeTab === 'basic' ? 'active i-setting' : 'i-setting'}
          >
            General
          </div>
          <div
            onClick={() => this.handleClick('advanced')}
            tabIndex={0}
            onKeyDown={() => this.handleClick('advanced')}
            role="menuitem"
            className={activeTab === 'advanced' ? 'active i-setting' : 'i-setting'}
          >
            Advanced
          </div>
        </div>
        {activeTab === 'basic' && <BasicSettings apis={apis} account={account} database={database} />}
        {activeTab === 'advanced' && <AdvancedSettings apis={apis} database={database} account={account} />}
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
