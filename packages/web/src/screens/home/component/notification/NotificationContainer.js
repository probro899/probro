import React from 'react';

class NotificationContainer extends React.Component {
  state = {};

  async componentWillMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(stream);
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
