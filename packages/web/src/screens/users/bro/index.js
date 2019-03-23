import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../../home/component/index';
import { SideNav, Profile, Blogs, Classes, Settings } from '../components';
import * as actions from '../../../actions';

class HomePage extends Component {
  state = {};

  componentWillMount() {
    const { updateFormValue, match } = this.props;
    // this is to prevent hitting people
    if (match.params.id !== sessionStorage.getItem('SESSION_ID')) {
      this.setState({ error: true });
    }
    updateFormValue('loginForm', { success: false });
  }

  render() {
    const { main } = this.props;
    const { error } = this.state;
    let activeBar;
    switch (main.activeNav.name) {
      case ('Profile'):
        activeBar = <Profile />;
        break;
      case ('Settings'):
        activeBar = <Settings />;
        break;
      case ('Classes'):
        activeBar = <Classes />;
        break;
      case ('Blogs'):
        activeBar = <Blogs />;
        break;
      default:
        activeBar = <Profile />;
    }
    return (
      error ? <Redirect push to="/login" />
        : (
          <div>
            <Navbar />
            <div className="broWrapper">
              <SideNav />
              {activeBar}
            </div>
          </div>
        )
    );
  }
}

HomePage.propTypes = {
  updateFormValue: PropTypes.func.isRequired,
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => state;

export default connect(mapStateToProps, { ...actions })(HomePage);
