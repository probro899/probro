import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from '../../../screens/home/component';
import Footer from '..';
import { Spinner } from '../..';
import HeaderBanner from '../../HeaderBanner';
import ReactHelmet from '../../react-helmet';

class Privacy extends React.Component {
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
        <ReactHelmet match={match} headerData={{ title: 'Privacy Policy' }} />
        <Navbar />
        <HeaderBanner
          title="Privacy Policy"
          subTitle="Read to find our about our policies"
          bgColor="#0F2E54"
        />
        <div className="pc-privacy pc-container">
          <div className="pc-privacy-content">
            <p>
              We use your personal information only for providing services and improving the Site.
              By using the site, you agree to the collection and use of information in accordance
              with the following policy. Unless otherwise defined in this Privacy Policy,
              terms used in this privacy policy have the same meanings as in our
              {' '}
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
              .
            </p>
            <h3>1. Information We Collect</h3>
            <ul>
              <li>
                The information you actively give us when you perform certain actions in our site,
                such as creating an account, filling out your profile details, writing blogs, creating
                classrooms(Projects), and communications(audio, video, conferencing etc.).
              </li>
              <li>
                While using our site you may also provide data that is not personally
                identifiable(&quot;non-identifying data&quot;). This includes your expertize, timezone, language.
              </li>
              <li>
                We may also collect information about your interactions with this Platform,
                such as requests posted, session history, pages viewed, likes and connections.
              </li>
              <li>
                Like many sites, we collect information that your browser sends
                whenever you visit our site (&quot;Log Data&quot;). This Log Data may include information
                such as your computer&apos;s Internet Protocol address, browser type, browser
                version, the pages of our site that you visit, the time and date of your visit,
                the time spent on those pages, and other statistics.
              </li>
              <li>
                Our website also sends your browser some cookies which are stored on your computers hard drive.
                Cookies are very small files containing data. However you can block cookies from your browser settings.
                We recommend you not blocking the cookies because we use it to enhance your experience in our site.
              </li>
              <li>
                If you connect your Proper Class account with third parties like google, we store information
                provided by those third-party services such as email and profile information. This information
                is controlled by the third-party service or your authorization via the privacy settings
                at that service.
              </li>
            </ul>
            <h3>2. Use of Personal Information</h3>
            <ul>
              <li>
                We may use your personal credentials to send you emails, notifications or other
                important reminders.
              </li>
              <li>
                Information collected from users can also be used to analyse the trend to improve our product development.
              </li>
              <li>
                Collected data is used to improve, maintain, and develop our services. For example,
                we use the personal information to recommend mentors to mentees.
              </li>
              <li>
                We may use also feature profile in our most viewed pages as our testimonials and success stories.
              </li>
              <li>
                To investigate and prevent security issues and abuse.
              </li>
              <li>
                We display your public information to other people using our site, such as your experience,
                education etc. But we won&apos;t share your sensitive information like conversation and login credentials.
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

Privacy.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Privacy;
