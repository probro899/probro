import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const file = require('../../../../assets/icons/64w/uploadicon64.png');

class NotificationContainer extends React.Component {
  state = {};

  render() {
    const { database } = this.props;
    console.log(database.Notification);
    return (
      <div className="notification-list">
        {
          database.Notification.allIds.map((noti, index) => {
            const notification = database.Notification.byId[noti];
            return (
              <div className="pc-noti-wrapper" key={index}>
                <div className="pc-noti-img">
                  <img alt="Notification sender" src={file} />
                </div>
                <div className="pc-noti-body">
                  <p className="pc-noti-desc">
                    {notification.body}
                  </p>
                  <p className="pc-ago-date">{moment(notification.timeStamp).fromNow()}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  // apis: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(NotificationContainer);
