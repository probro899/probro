import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NotificationContainer extends React.Component {
  state = {};

  render() {
    const { database } = this.props;
    console.log(database.Notification);
    return (
      <div className="notification-list">
        {
          database.Notification.allIds.map((noti) => {
            const notification = database.Notification.byId[noti];
            return (
              <div className="notification-wrapper">
                <div className={notification.viewStatus ? 'vwd' : 'ntvwd'}>
                  {notification.body}
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
