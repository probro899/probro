/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../common/utility-functions/Button/Button';
import CopytoClipboard from '../CopyToClipboard/index';

const Subscription = (props) => {
  // console.log('Props in subscription', props);
  const { orgObj } = props;
  const { subscribedPackage } = orgObj;
  let planName = '';
  let subscribeOn = null;
  let price = null;
  let referenceCode = null;
  if (subscribedPackage) {
    const { packageDetail } = subscribedPackage;
    referenceCode = subscribedPackage.referenceCode;
    planName = packageDetail.descrition;
    subscribeOn = subscribedPackage.timeStamp;
    price = packageDetail.price;
  }

  return (
      <>
        {subscribedPackage && (
          <>
            <div className="pc-sub-header">
              <div className="pc-header-detail">
                <h3 className="pc-sub-name">{planName}</h3>
                <p className="pc-subscribe">Subscribed on: <strong><Moment format="YYYY-MM-DD">{subscribeOn}</Moment></strong></p>
                <p className="pc-expire">Expires on: <strong>{}</strong></p>
              </div>
              <div className="pc-sub-price">
                <p>
                  <strong>Rs.{price}</strong>
                  / month
                </p>
              </div>
            </div>
            <p className="pc-subscribe">Reference Code</p>
            <CopytoClipboard value={referenceCode} />
          </>
        )}
        <div className="pc-plan-action">
          <div className="pc-plan-up">
            <Link to={`/upgrade/organization/${orgObj.id}`}>
              <Button
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--medium"
                title="Upgrade plan"
              />
            </Link>
          </div>
          {/* <a href="#" className="pc-sub-cancel">
            Cancel subscription
          </a> */}
        </div>
      </>
  );
};

export default Subscription;
Subscription.propTypes = {
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
