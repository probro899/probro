import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { Navbar } from '../home/component';
import SmallScreenSideNav from './SmallScreenSideNav';
import SideNav from './SideNav';
import Profile from './profile';
import Setting from './setting';
import DrawingBoard from './drawing-board';
import Connection from './connection';
// import Message from './message';
import Class from '../class/Class';
import { Blog } from '../blog';

class HomePage extends Component {
  constructor(props) {
    super(props);
    const { account, match } = this.props;
    this.state = { error: match.params.id !== account.slug };
  }

  state = { error: false };

  render() {
    const { error } = this.state;
    const { account, match } = this.props;
    return (
      error ? <Redirect push to="/" />
        : (
          <div>
            {/* redirect to home page if not logged in  */}
            {account.online ? <Navbar /> : <Redirect to="/" />}
            <div className="broWrapper">
              <SmallScreenSideNav match={match} />
              <SideNav match={match} />
              {/* fake-side-nav is just for the styling purpose only */}
              <div className="fake-side-nav" />
              <Route exact path={`${match.path}/profile`} component={Profile} />
              <Route exact path={`${match.path}/classes`} component={Class} />
              <Route exact path={`${match.path}/blog`} component={Blog} />
              <Route exact path={`${match.path}/settings`} component={Setting} />
              <Route exact path={`${match.path}/drawing-board`} component={DrawingBoard} />
              <Route exact path={`${match.path}/connection`} component={Connection} />
              {/* <Route exact path={`${match.path}/messages`} component={Message} /> */}
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
