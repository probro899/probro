import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
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
import { GET_BRAND_LIST } from '../../../queries';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    };
  }

  async componentWillMount() {
    store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
    try {
      const res = await axios.post(`${ENDPOINT}/web/get-index`);
      console.log('get index record', res.data);
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
    // console.log('render called', loading, data);
    return (
      loading ? <Spinner />
        : (
          <div>
            <Navbar />
            <Slider data={data.sliderImages} />
            <Banner />
            <Post />
            <Popular data={data.indexUsers} />
            <Footer />
          </div>
        )
    );
  }
}

export default HomePage;
