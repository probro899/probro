/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import OutgoingCallScreen from './outgoing-screen';
import LiveCallScreen from './live-screen';

class Index extends React.Component {
  state = {};

  render() {
    const { webRtc } = this.props;
    return webRtc.isLive ? <LiveCallScreen {...this.props} /> : <OutgoingCallScreen {...this.props} />;
  }
}

Index.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Index;
