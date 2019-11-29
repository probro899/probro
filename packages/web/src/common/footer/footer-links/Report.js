import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class Report extends React.Component {
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
        <div className="pc-report">
          <div className="pc-report-content">
            <h2>Report</h2>
            <p>
              Most of us here don't like how we are given education in universities.
              In countries like Nepal, India and other south Asian countries the education is merely practical.
              We are taught all the theories but when it comes to real life, real projects, we can't even kick off.
              So I am not pointing college professors as your Mentors.
              But Mentors are those who have practical knowledge and experience to guide you through the game.
              A college professor can also be a Mentor but on certain aspects like (how to be a professor :D),
              isn't it? He can't teach you with the real sentiment of an entrepreneur to be an entrepreneur,
              he can't teach you with the real emotions of a scientist to be a scientist etc. You can just relate, right?
              He can be a great teacher but not a great mentor. 
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Report.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Report);
