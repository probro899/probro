import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../actions';
import { Navbar } from '../component';
import Slider from './slider';
import Banner from './banner';
import Popular from './popular';
import Post from './posts';
import Footer from '../../../common/footer';
import { ENDPOINT } from '../../../config';

class HomePage extends Component {
  state = {
    data: {},
    loading: true,
  };

  async componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'properClass' },
    });
    try {
      const res = await axios.get(`${ENDPOINT}/web/get-index`);
      this.setState({
        data: res.data,
        loading: false,
      });
    } catch (e) {
      console.log('Eror: ', e);
    }
  }

  render() {
    const { data, loading } = this.state;
    return loading ? <div /> : (
      <div>
        <Navbar />
        <Slider data={data.sliderImages} />
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
