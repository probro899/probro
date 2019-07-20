import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

class CallScreen extends React.Component {
  state = {};

  goBack = () => {
    const { change } = this.props;
    change('history');
  }

  render() {
    const { style } = this.props;
    return (
      <div
        className="call-screen"
        style={style}
      >
        <div className="top">
          <div>
            <Button
              // text="Back"
              minimal
              intent="default"
              icon="double-chevron-left"
              onClick={this.goBack}
            />
          </div>
          <div className="op-name">
            Conor Mcgregor
          </div>
          <div />
        </div>
        <div className="video-container">
          {/* eslint-disable-next-line */}
          <video controls id="video1" playsInline autoPlay />
        </div>
        <div className="controllers">
          <Button icon="phone" intent="success" />
          <Button icon="mobile-video" intent="success" />
          <Button icon="duplicate" intent="success" />
          <Button icon="record" intent="success" />
          <Button icon="headset" intent="success" />
        </div>
      </div>
    );
  }
}

CallScreen.propTypes = {
  style: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CallScreen;
