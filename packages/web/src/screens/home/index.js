import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navbar, Slider, Post, Banner, Popular } from './component';


class HomePage extends Component {
  state = {};

  componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'properClass' },
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Slider />
        <Banner />
        <Post />
        <Popular />
      </div>
    );
  }
}


HomePage.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(HomePage);
