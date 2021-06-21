/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import CardSkeleton from './CardSkeleton';
import Subscription from './Subscription';
import CopyToClipboard from './CopyToClipboard';
import { ENDPOINT } from '../../../../config';

class Home extends React.Component {
  componentDidMount() {
    const { setActiveHeader } = this.props;
    setActiveHeader('home');
  }

  render() {
    const { orgObj } = this.props;
    return (
        <>
          <Overview {...this.props} />
          <div className="pc-sub-pay">
            <CardSkeleton title="Subscription plan">
              <Subscription {...this.props} />
            </CardSkeleton>
          </div>
          <div className="copy-to-clipboard">
            <CardSkeleton title="Copy URL">
              <CopyToClipboard value={`${ENDPOINT}/organization/${orgObj.slug}`} />
            </CardSkeleton>
          </div>
        </>
    );
  }
}

export default Home;
Home.propTypes = {
  setActiveHeader: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
