import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar } from '../../home/component/index';
import { SideNav, Profile } from '../components';
import * as actions from '../../../actions';

class HomePage extends Component {
  state = {};

  componentWillMount() {
    const { updateFormValue } = this.props;
    updateFormValue('loginForm', { success: false });
  }

  render() {
    const { main } = this.props;
    let activeBar;
    switch (main.activeNav) {
      case ('Profile'):
        activeBar = <Profile />;
        break;
      default:
        activeBar = <Profile />;
    }
    return (
      <div>
        <Navbar />
        <div className="broWrapper">
          <SideNav />
          {activeBar}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  updateFormValue: PropTypes.func.isRequired,
  main: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(HomePage);
