import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../../socket';
import * as actions from '../../../../actions';
import AdditionalForm from './AdditionalForm';
import BasicForm from './BasicForm';
import AdvancedForm from './AdvancedForm';

const detailForm = (activeTab, apis) => {
  switch (activeTab) {
    case 'basic':
      return (<BasicForm apis={apis} />);
    case 'additional':
      return (<AdditionalForm apis={apis} />);
    case 'advanced':
      return (<AdvancedForm apis={apis} />);
    default:
      return null;
  }
};

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
    return (
      <div className="settings">
        <div className="title">
          <span>Settings Page</span>
        </div>
        <div className="account-details">
          <div className="setting-types">
            <div onClick={() => this.handleClick('basic')} tabIndex={0} onKeyDown={() => this.handleClick('basic')} role="menuitem" className={activeTab === 'basic' ? 'active' : ''}>Basic Details</div>
            <div onClick={() => this.handleClick('additional')} tabIndex={0} onKeyDown={() => this.handleClick('additional')} role="menuitem" className={activeTab === 'additional' ? 'active' : ''}>Additional Details</div>
            <div onClick={() => this.handleClick('advanced')} tabIndex={0} onKeyDown={() => this.handleClick('advanced')} role="menuitem" className={activeTab === 'advanced' ? 'active' : ''}>Advanced settings</div>
            <button type="button">Switch to Expert</button>
          </div>
        </div>
        {detailForm(activeTab, apis)}
      </div>
    );
  }
}

Setting.propTypes = {
  updateNav: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Setting);
