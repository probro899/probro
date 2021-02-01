/* eslint-disable react/jsx-indent */
import React from 'react';
import { FiVideoOff, FiMicOff } from 'react-icons/fi';
import { Card } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const DeviceNotFoundError = (props) => {
  const { webRtc } = props;
  const { deviceNotAllowed } = webRtc;

  if (deviceNotAllowed) {
    return (
      <Card style={{ maxWidth: '80%' }}>
        <h3>Camera and microphone are blocked</h3>
        <span>
            Properclass requires access to your camera and microphone. Click the camera blocked icon
            <FiVideoOff color="red" size={20} style={{ padding: 2, marginBottom: -5 }} />
            in your browser`s address bar.
        </span>
      </Card>
    );
  }

  if (webRtc.devices) {
    const audioDevices = webRtc.devices.audio;
    const videoDevices = webRtc.devices.video;

    if (audioDevices && videoDevices) {
      if (audioDevices.length === 0 && videoDevices.length === 0) {
        return (
          <Card style={{ maxWidth: '80%' }}>
          <h3>Camera and microphone are not found or blocked</h3>
          <span>
              Properclass requires access to your camera and microphone. Click the camera blocked icon
              <FiVideoOff color="red" size={20} style={{ padding: 2, marginBottom: -5 }} />
              in your browser`s address bar.
          </span>
          </Card>
        );
      }
      if (audioDevices.length === 0) {
        return (
          <Card style={{ maxWidth: '80%' }}>
          <h3>Microphone is not found or blocked</h3>
          <span>
              Properclass requires access to your camera and microphone. Click the camera blocked icon
              <FiMicOff color="red" size={20} style={{ padding: 2, marginBottom: -5 }} />
              in your browser`s address bar.
          </span>
          </Card>
        );
      }
      if (videoDevices.length === 0) {
        return (
          <Card style={{ maxWidth: '80%' }}>
          <h3>Camera is not found or blocked</h3>
          <span>
              Properclass requires access to your camera and microphone. Click the camera blocked icon
              <FiVideoOff color="red" size={20} style={{ padding: 2, marginBottom: -5 }} />
              in your browser`s address bar.
          </span>
          </Card>
        );
      }
    }
  }
  return <div />;
};

export default DeviceNotFoundError;
DeviceNotFoundError.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
