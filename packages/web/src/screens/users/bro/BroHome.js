import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../../home/component/index';
import { SideNav, Profile, Blogs, Classes, Settings } from '../components';

class HomePage extends Component {
  state = {
    activeNav: 'Profile',
  };

  componentWillMount() {
    const { account, match } = this.props;
    // this is to prevent hitting people
    if (match.params.id !== account.sessionId) {
      this.setState({ error: true });
    }
  }

  changeSideNav = (name) => {
    this.setState({
      activeNav: name,
    });
  }

  render() {
    const { activeNav, error } = this.state;
    let activeBar;
    const { account } = this.state;
    switch (activeNav) {
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
            {/* redirect to home page if not logged in  */}
            {account ? <Navbar /> : <Redirect to="/" />}
            <div className="broWrapper">
              <SideNav activeNav={activeNav} changeSideNav={this.changeSideNav} />
              {activeBar}
            </div>
          </div>
        )
    );
  }
}

HomePage.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps)(HomePage);
