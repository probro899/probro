import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Support extends React.Component {
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
        <ReactHelmet match={match} headerData={{ title: 'Support' }} />
        <Navbar />
        <HeaderBanner
          title="Support"
          subTitle="Let us know your concern"
        />
        <div className="pc-support pc-container">
          <div className="pc-support-content">
            <p>
              Please make sure you need it before you write us.
              <br />
              If you are facing any problem on this site. Please write us your issue.
              {' '}
              <Link to="#">support@properclass.com</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Support.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Support;
