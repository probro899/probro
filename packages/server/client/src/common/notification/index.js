/* eslint-disable no-undef */
import React from 'react';
import Notification from 'react-web-notification';
import PropTypes from 'prop-types';

// import { Howl } from 'howler';

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    this.state = {
      ignore: true,
      title,
      options: {
        tag: 'now',
        icon: '/assets/graphics/logo.svg',
        image: '/assets/graphics/logo.svg',
        lang: 'en',
        dir: 'ltr',
        sound: '/assets/media/ringtone.mp3',
      },
    };
  }

  handlePermissionGranted = () => {
    this.setState({
      ignore: false,
    });
  }

  handlePermissionDenied = () => {
    this.setState({
      ignore: true,
    });
  }

  handleNotSupported = () => {
    this.setState({
      ignore: true,
    });
  }

  handleNotificationOnShow = () => {
    // this.playSound();
  }

  // playSound = () => {
  //   const sound = new Howl({
  //     src: ['/assets/media/ringtone.mp3', '/assets/media/ringtone.ogg', '/assets/media/ringtone.wav'],
  //   });
  //   sound.play();
  // }

  onNotificationClick = () => {
    window.focus();
  }

  render() {
    const { ignore, title, options } = this.state;
    // console.log('prosp in notification', this.props);
    return (
      <div>
        <Notification
          ignore={ignore}
          // disableActiveWindow
          notSupported={this.handleNotSupported}
          onPermissionGranted={this.handlePermissionGranted}
          onShow={this.handleNotificationOnShow}
          timeout={60000}
          title={title}
          options={options}
          onClick={this.onNotificationClick}
          swRegistration={this.props.swRegistration}
        />
      </div>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NotificationComponent;
