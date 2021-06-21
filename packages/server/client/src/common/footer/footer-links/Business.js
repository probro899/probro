import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Business extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { match } = this.props;
    if (loading) { return <Spinner wClass="spinner-wrapper" />; }
    return (
      <div>
        <ReactHelmet match={match} headerData={{ title: 'Business Enquiry' }} />
        <Navbar />
        <HeaderBanner title="Business Enquiry" subTitle="Are you looking for tailored solution?" bgColor="#0F2E54" />
        <div className="pc-business pc-container">
          <div className="pc-business-content">
            <p>
              If you are willing to partner with us or want to know more about our business. Please write
              us at {' '}
              <Link to="#">info@properclass.com</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Business;
