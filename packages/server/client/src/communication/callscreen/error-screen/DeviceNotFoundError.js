import React from 'react';
import { FiMic, FiVideo } from 'react-icons/fi';
import PropTypes from 'prop-types';

const DeviceNotFoundError = (props) => {
  const { webRtc } = props;
  if (webRtc.devices) {
    const audioDevices = webRtc.devices.audio;
    const videoDevices = webRtc.devices.video;

    if (audioDevices && videoDevices) {
      if (audioDevices.length === 0 && videoDevices.length === 0) {
        return (
          <div>
            <FiMic color="red" size={20} />
            <span style={{ color: 'red', margin: 5, fontSize: 15 }}>Microphone not found</span>
            <br />
            <FiVideo color="red" size={20} />
            <span style={{ color: 'red', margin: 5, fontSize: 15 }}>Webcam not found</span>
          </div>
        );
      }
      if (audioDevices.length === 0) {
        return (
          <div>
            <FiMic color="red" size={20} />
            <span style={{ color: 'red', margin: 5, fontSize: 15 }}>Microphone not found</span>
          </div>
        );
      }
      if (videoDevices.length === 0) {
        return (
          <div>
            <FiVideo color="red" size={20} />
            <span style={{ color: 'red', margin: 5, fontSize: 15 }}>Webcam not found</span>
          </div>
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
