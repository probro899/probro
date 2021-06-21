import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Services extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.setState({
      loading: false,
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { loading } = this.state;
    const { match } = this.props;
    if (loading) { return <Spinner wClass="spinner-wrapper" />; }
    return (
      <div>
        <ReactHelmet match={match} headerData={{ title: 'Our Software Services' }} />
        <Navbar />
        <HeaderBanner title="Our Software Services" subTitle="Are you looking for tailored software services?" bgColor="#0F2E54"/>
        <div className="pc-services pc-container">
          <div className="pc-services-content">
            <p>
              Our main business is the Proper Class online Mentorship platform. However, we provide other software solutions. We have expertise in mobile app development, digital marketing and web development.
              <br />
              If you are looking for software solutions for your business, please write us at
              {' '}
              <Link to="#">info@properclass.com</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Services.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Services;
