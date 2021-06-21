import React, { useEffect } from 'react';
import store from '../../../store';
import updateNav from '../../../actions/navigate';
import { Navbar } from '../component';
import Popular from './popular';
import Footer from '../../../common/footer';
import MainBanner from './MainBanner';
import OurStats from './OurStats';
import FeaturedCourses from './FeaturedCourses';
import HowItWorks from './HowItWorks';
import CallToAction from './CallToAction';
import PartnerSection from './PartnerSection';
import ReactHelmet from '../../../common/react-helmet';

function HomePage(props) {
  useEffect(() => {
    store.dispatch(updateNav({ schema: 'mainNav', data: { name: 'properClass' } }));
    if (typeof document === 'object') {
      navigator.serviceWorker.register('sw.js').then(swRegistration => store.dispatch({ type: 'updateWebRtc', schema: 'swRegistration', payload: swRegistration }));
    }
  }, []);
 
  return (
    <>
      <ReactHelmet {...props} />
      <Navbar />
      <MainBanner />
      <OurStats />
      <HowItWorks />
      <FeaturedCourses />
      <Popular />
      <PartnerSection />
      <CallToAction />
      <Footer />
    </>
  );
}
export default HomePage;
