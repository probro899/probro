import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import { Button } from '../../utility-functions/Button/Button';

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
    window.scrollTo(0, 0);
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <Navbar />

        <main className="pc-career-section pc-container">
          <section className="pc-career-wrapper">
            <div className="pc-hero-section">
              <div className="pc-hero-title">
                <h1>Join our Team</h1>
              </div>
              <div className="pc-hero-subtitle">
                <p>Help us on our quest to make online learning even better</p>
              </div>
              <div className="pc-current-opening-button">
                <Button
                  onClick={() => { }}
                  type="button"
                  buttonStyle="btn--primary--solid"
                  buttonSize="btn--medium"
                  title="See current openings" />
              </div>
            </div>
            {/* <div className="pc-benefits-section">
              <div className="pc-bentfits-header">
                <div className="pc-benefit-title">
                  <h2>What's in it for you</h2>
                </div>
                <div className="pc-benefit-subtitle">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud </p>
                </div>
              </div>
            </div> */}
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

Career.propTypes = {
  updateNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Career);
