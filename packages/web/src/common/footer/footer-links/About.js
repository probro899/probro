import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';

class About extends React.Component {
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
        <div className="pc-about">
          <div className="pc-about-header">
            <h1>About Us</h1>
            <p>Revolutionizing Online Mentorship</p>
          </div>
          <div className="pc-about-content">
            <h2>Our Story</h2>
            <p>
              Proper Class begins some years ago when two classmates were doing their college
              project during their bachelors final year. They realized the traditional way of in person
              Mentorship has not been effective in this era. So they came up with a plan to integrate all
              the tools and techniques to make online Mentorship possible and better.
            </p>
            <h2>Mentorship since history</h2>
            <p>
              Great men and women who left remarkable achievements and great inspiration had
              Mentors in their lives. Bruce Lee, Albert Einstein, Steven Hawkins, Alexander The Great,
              Aristotle, Plato, Steve Jobs and many other great leaders and protagonists had one or more
              Mentors in their lives.
              <br />
              <br />
              Mentorship is not just a tool or a concept to do good in our lives but it has been
              in many cultures sinces ages. Like Hindu people have gurus who mentor them throughout
              their lifetime in bad and good times. Mentors are respected, loved and given a higher
              priority.
            </p>
            <h2>A World of Opportunities</h2>
            <p>
              Proper Class gives a platform for learners and teachers. Specially to professionals who have
              real field knowledge, and have ability to pass that knowledge to noobies who are just aspiring.
              And to the people who are looking to get real field knowledge through experienced Mentors. Proper
              Class breaks the physical barriers and makes it possible to meet experienced mentors, get mentored
              and pay from a single place.
            </p>
            <h2>Our Vision</h2>
            <p>
              A world with practical education from experienced Mentors.
            </p>
            <h2>Our Mission</h2>
            <p>
              To create opportunities so people can share and access quality education.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

About.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(About);
