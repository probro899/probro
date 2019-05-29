import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Navbar } from '../../home/component/index';
import { SideNav, Profile, Blog, Class, Setting } from '../components';
import client from '../../../socket';

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

  async componentDidMount() {
    const apis = await client.scope('Mentor');
    console.log('apis in Brohome', apis);
  }

  changeSideNav = (name) => {
    this.setState({
      activeNav: name,
    });
  }

  render() {
    const { activeNav, error } = this.state;
    let activeBar;
    const { account } = this.props;
    switch (activeNav) {
      case ('Profile'):
        activeBar = <Profile />;
        break;
      case ('Settings'):
        activeBar = <Setting />;
        break;
      case ('Classes'):
        activeBar = <Class />;
        break;
      case ('Blog'):
        activeBar = <Blog />;
        break;
      default:
        activeBar = <Profile />;
    }
    return (
      error ? <Redirect push to="/" />
        : (
          <div>
            {/* redirect to home page if not logged in  */}
            {account.online ? <Navbar /> : <Redirect to="/" />}
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
