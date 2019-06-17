import React from 'react';

class NotificationContainer extends React.Component {
  state = {};

  componentWillMount() {
    const { apis } = this.props;
    console.log(apis);  
  }

  render() {
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

export default NotificationContainer;
