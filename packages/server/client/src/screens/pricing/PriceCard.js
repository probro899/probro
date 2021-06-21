/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../common/utility-functions/Button/Button';
import Card from '../../common/Card';

const PriceCard = (props) => {
  // console.log('props in package card', props);
  const { packageType, priceDescription, buttonText, data, isSubscribe, packageId, changeData, packageDetail } = props;
  const [loading, changeLoading] = useState(null);
  const packageObj = {
    noOfClass: 'No of Classes',
    oneToOneChat: 'One to one chat',
    oneToOneCall: 'One to one call',
    groupChat: 'Group chat',
    groupCall: 'Group call',
    screensharing: 'Screensharing',
    callRecording: 'Call Recording',
    noOfUserInclassRoom: 'Max user in a class room',
    drawingBoard: 'White board',
    blogging: 'Blogging',
    reporting: 'Reporting',
    notificationOfAllClassActivity: 'Notification for all class activity',
    projectManagementTool: 'Project management tool',
    // classType: 'Class type',
  };

  const subscribeHandler = async () => {
    try {
      const { webRtc, match, account, updateNav, updateDatabaseSchema } = props;
      const { apis } = webRtc;
      changeLoading(packageId);
      const record = { type: match.params.orgId ? 'organization' : 'individual', packageId, uId: account.user.id, oId: match.params.orgId };
      const res = await apis.addSellPackage(record);
      changeLoading(null);
      if (res.status === 200) {
        changeData({ packageId, isSubscribe: res });
        if (match.params.orgId) {
          updateDatabaseSchema('Organization', { id: parseInt(match.params.orgId, 10), subscribedPackage: { ...res, packageDetail } });
        }
        updateNav({ schema: 'popNotification', data: { active: true, message: res.message, intent: 'success' } });
      }
      if (res.status === 201) {
        updateNav({ schema: 'popNotification', data: { active: true, message: res.message, intent: 'error' } });
      }
    } catch (e) {
      changeLoading(null);
    }
  };

  const keys = Object.keys(packageObj);
  return (
    <div className="pc-price-card-wrapper">
      <div className="pc-price-containers">
        <Card>
          <div className="pc-price-name-and-desc">
            <h4>{packageType}</h4>
            <p>{priceDescription}</p>
          </div>
          <div className="pc-plan-feature-list">
            <ul>
              {
                keys.map((key) => (
                  <li>
                    {data[key] === 1 && <img src="/assets/graphics/check.svg" />}
                    {/* use cancel.svg for cross icon */}
                    <div className="price-info">
                      <p>{packageObj[key]}</p>
                      {data[key] !== 1 && <p className="price-stats">{data[key]}</p>}
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="pc-price-and-submit">
            {/* <div className="pc-plan-price">
              <span className="pc-price">
                ${planPrice}
              </span>
              <span className="pc-plan-month-user">
                per user/month
              </span>
            </div> */}
            <div className="pc-cta-btn">
              <Button
                onClick={subscribeHandler}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--medium"
                title={buttonText}
                disabled={isSubscribe}
                loading={loading === packageId}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PriceCard;
PriceCard.propTypes = {
  packageType: PropTypes.string.isRequired,
  priceDescription: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isSubscribe: PropTypes.objectOf(PropTypes.any).isRequired,
  packageId: PropTypes.number.isRequired,
  changeData: PropTypes.func.isRequired,
  packageDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.objectOf(PropTypes.any).isRequired,
}