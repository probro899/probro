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
import { Spinner } from '../../../common';

class HomePage extends Component {
  state = {
    data: {},
    loading: true,
  };

  async componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: 'properClass' },
    });
    try {
      const res = await axios.get(`${ENDPOINT}/web/get-index`);
      // console.log('res', res);
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
    return loading ? <Spinner /> : (
      <div>
        <Navbar />
        <Slider data={data.sliderImages} />
        <Banner />
        <Post />
        <Popular data={data.indexUsers} />
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
