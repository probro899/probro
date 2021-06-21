import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Report extends React.Component {
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
        <ReactHelmet match={match} headerData={{ title: 'Report' }} />
        <Navbar />
        <HeaderBanner
          title="Report"
          subTitle="Please tell us what you're going through"
          bgColor="#0F2E54"
        />
        <div className="pc-report pc-container">
          <div className="pc-report-content">
            <p>
              If you find any sort of malfunction, bug or if you find anything abusive.
              <br />
              Please write us about at
              {' '}
              <Link to="#">report@properclass.com</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Report.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Report;
