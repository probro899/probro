import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Terms extends React.Component {
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
        <ReactHelmet match={match} headerData={{ title: 'Terms and Conditions' }} />
        <Navbar />
        <HeaderBanner
          title="Terms and Conditions"
          subTitle="coming soon..."
        />
        <div className="pc-terms pc-container">
          <div className="pc-terms-content">
            <p>
              Terms and Conditions Coming Soon....
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Terms.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Terms;
