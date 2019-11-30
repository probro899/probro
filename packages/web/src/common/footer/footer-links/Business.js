import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class Business extends React.Component {
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
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div>
        <Navbar />
        <div className="pc-business">
          <div className="pc-business-content">
            <h2>Business Enquiry</h2>
            <p>
              Our main business is Proper Class online Mentorship platform. However we provide other
              tech related solutions.
              <br />
              If you are willing to partner with us or want to know more about our business. Please write
              us at
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

Business.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Business);
