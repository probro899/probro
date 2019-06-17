import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NotificationContainer extends React.Component {
  state = {};

  componentWillMount() {
    const { apis } = this.props;
  }

  render() {
    const { database } = this.props;
    console.log(database.Notification);
    return (
      <div className="notification-list">
        <div className="notification-wrapper">
          <div className="ntvwd">
            A new notification unviewed
          </div>
        </div>
        <div className="notification-wrapper vwd">
          <div className="vwd">
              A new notification unviewed
          </div>
        </div>
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(NotificationContainer);
