import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class Support extends React.Component {
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
        <div className="pc-support">
          <div className="pc-support-content">
            <h2>Support</h2>
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
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Support);
