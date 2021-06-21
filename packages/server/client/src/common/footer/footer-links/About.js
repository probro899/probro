import React from 'react';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class About extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { match } = this.props;
    if (loading) { return <Spinner wClass="spinner-wrapper" />; }
    return (
      <>
        <ReactHelmet match={match} headerData={{title: 'About Us' }} />
        <Navbar />
        <HeaderBanner title="About Us" subTitle="Revolutionizing Online Mentorship" />
        <div className="pc-about pc-container">
          <div className="pc-about-wrapper">
            <div className="pc-about-content">
              <h2>Our Story</h2>
              <p>
                Proper Class begins some years ago when two colleagues were doing their college project during their bachelor's final year. They realized the traditional way of personal Mentorship has not been effective in this era. So they came up with a plan to integrate software tools to make online Mentorship possible and better.
              </p>
              <h2>History of Mentorship</h2>
              <p>
                Great men and women who left remarkable achievements and great inspiration had had mentors in their lives. Bruce Lee, Albert Einstein, Steven Hawkins, Alexander The Great, Aristotle, Plato, Steve Jobs, and many other great leaders and protagonists had one or more Mentors in their lives.
              <br />
                <br />
              Mentorship is not just a tool or a concept to do good in our lives but it has been in many cultures for ages. Like Hindu people have gurus who mentor them throughout their lifetime in bad and good times. Mentors are respected, loved, and a higher priority.
              </p>
              <h2>A World of Opportunities</h2>
              <p>
                Proper Class gives a platform for learners and teachers. Especially to professionals who have the experience, and have the ability to pass that knowledge to students. And to the people who are looking to get practical knowledge from experienced Mentors. Proper Class breaks the physical barriers and makes it possible to meet experienced mentors, get mentored, and pay from a single place.
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
        </div>
        <Footer />
      </>
    );
  }
}

export default About;
