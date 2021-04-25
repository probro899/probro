import React, { useEffect } from 'react';
import store from '../../../store';
import updateNav from '../../../actions/navigate';
import { Navbar } from '../component';
import Banner from './banner';
import Popular from './popular';
import Footer from '../../../common/footer';
import MainBanner from './MainBanner';
import OurStats from './OurStats';
import FeaturedCourses from './FeaturedCourses';

function HomePage() {
  
  useEffect(() => {
    store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
    if (typeof document === 'object') {
      navigator.serviceWorker.register('sw.js').then(swRegistration => store.dispatch({ type: 'updateWebRtc', schema: 'swRegistration', payload: swRegistration }));
    }
  }, []);

  return (
    <>
      <Navbar />
      <MainBanner />
      <OurStats />
      <FeaturedCourses />
      <Banner />
      <Popular />
      <Footer />
    </>
  );
}
export default HomePage;
