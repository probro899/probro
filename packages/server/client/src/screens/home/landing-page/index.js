import React from 'react';
import { useQuery } from '@apollo/client';
import store from '../../../store';
import updateNav from '../../../actions/navigate';
import { Navbar } from '../component';
import Slider from './slider';
import Banner from './banner';
import Popular from './popular';
import Post from './posts';
import Footer from '../../../common/footer';
import { Spinner } from '../../../common';
import { GET_POPULAR } from '../../../queries';
import clientConfig from '../../../clientConfig';

class HomePage extends React.Component {
  state ={ loading: true, data: null };

  async componentWillMount() {
    store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
    const { data, loading, error } = await clientConfig.query({ query: GET_POPULAR, fetchPolicy: 'network-only' });
    this.setState({ loading: false, data });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) return <Spinner />;
    return (
      <div>
        <Navbar />
        <Slider />
        <Banner />
        <Post />
      {data && <Popular data={data.getPopular.users} />}
        <Footer />
      </div>
    );
  }
}
export default HomePage;
