import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Navbar } from '../component';
import Slider from './slider';
import Banner from './banner';
import Popular from './popular';
import Post from './posts';
import Footer from '../../../common/footer';
import axios from 'axios';
import { ENDPOINT } from '../../../config';

class HomePage extends Component {
  state = {};

  async componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'properClass' },
    });
    const indexDataRes = await axios.get(`${ENDPOINT}/web/get-index`);
    console.log('indexRes', indexDataRes);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Slider />
        <Banner />
        <Post />
        <Popular />
        <Footer />
      </div>
    );
  }
}


HomePage.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(HomePage);
