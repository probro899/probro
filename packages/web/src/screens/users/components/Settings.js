import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import * as actions from '../../../actions';

const detailForm = (activeTab, form) => {
  switch (activeTab) {
    case 'basic':
      return (<Form data={form.basicForm} schema="basicForm" />);
    case 'additional':
      return (<Form data={form.additionalForm} schema="additionalForm" />);
    case 'advanced':
      return (<Form data={form.advancedForm} schema="advancedForm" />);
    default:
      return ('hello');
  }
};

class Settings extends Component {
  state = {
    activeTab: 'basic',
  }

  componentWillMount() {
    const { mainFormHandler } = this.props;
    mainFormHandler('initSettingForms', {}); // when we call
    // action from props dispatch and getstate are automatically passed.
  }

  handleClick = (name) => {
    this.setState({ activeTab: name });
  };

  render() {
    const { activeTab } = this.state;
    const { form } = this.props;
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
        {detailForm(activeTab, form)}
      </div>
    );
  }
}

Settings.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  mainFormHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(Settings);
