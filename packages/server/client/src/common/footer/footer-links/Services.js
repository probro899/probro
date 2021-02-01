import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class Services extends React.Component {
  state = { loading: true };

  componentDidMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'mainNav',
      data: { name: '' },
    });
    this.setState({
      loading: false,
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div>
        <Navbar />
        <div className="pc-services pc-container">
          <div className="pc-services-content">
            <h1>Our Software Services</h1>
            <p>
            Our main business is the Proper Class online Mentorship platform. However, we provide other software solutions. We have expertise in mobile app development, digital marketing, web application development, machine learning, and AI.
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
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Services);
