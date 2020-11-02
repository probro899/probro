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

function HomePage() {
  store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
  const { data, loading } = useQuery(GET_POPULAR);
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
export default HomePage;
