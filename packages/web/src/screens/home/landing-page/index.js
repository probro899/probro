import React, { Component } from 'react';
import axios from 'axios';
import store from '../../../store';
import updateNav from '../../../actions/navigate';
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
    store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
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

export default HomePage;
