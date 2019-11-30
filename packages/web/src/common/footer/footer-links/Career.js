import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class Career extends React.Component {
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
        <div className="pc-career">
          <div className="pc-career-content">
            <h2>Careers</h2>
            <p>
              We do not have any job openings at the moment.
              <br />
              But we always review what you can offer. You can write us at
              {' '}
              <Link to="#">careers@properclass.com</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Career.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Career);
