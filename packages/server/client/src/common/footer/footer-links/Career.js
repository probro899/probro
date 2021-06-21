import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import { Button } from '../../utility-functions/Button/Button';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Career extends React.Component {
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
      <>
        <ReactHelmet match={match} />
        <Navbar />
        <HeaderBanner
          title="Join our Team"
          subTitle="Are you willing to be part of a revolutionary team?"
        />
        <main className="pc-career-section pc-container">
          <section className="pc-career-wrapper">
            <div className="pc-hero-section">
              <div className="pc-current-opening-button">
                <Button
                  type="button"
                  buttonStyle="btn--primary--solid"
                  buttonSize="btn--medium"
                  title="See current openings"
                />
              </div>
            </div>
            <div className="pc-career">
              <div className="pc-career-content">
                <p>
                  We do not have any job openings at the moment.
                <br />
                But we always review what you can offer. You can write us at
                {' '}
                <Link to="#">careers@properclass.com</Link>
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Career;
