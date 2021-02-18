/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import React from 'react';

class Streaming extends React.Component {
  state = {};

  listMountPoint = () => {
    const { webRtc } = this.props;
    const { janus } = webRtc;
    const { streaming } = janus;
    const body = { request: 'list' };
    streaming.send({ message: body,
      success: (result) => {
        if (result.list) {
          const { list } = result;
          console.log("Got a list of available streams", list);
        }
      },
    });
  }

  getStreamInfo = () => {
    const { webRtc } = this.props;
    const { janus } = webRtc;
    const { streaming } = janus;
    // Send a request for more info on the mountpoint we subscribed to
    const body = { request: 'info', id: 10 };
    streaming.send({ message: body,
      success: (result) => {
        if (result && result.info && result.info.metadata) {
          console.log('stream info');
        }
        console.log('stream result', result);
      },
    });
  }

  watchStream = () => {
    const { webRtc } = this.props;
    const { janus } = webRtc;
    const { streaming } = janus;
    const body = { request: 'watch', id: 1 };
    streaming.send({ message: body });
    // No remote video yet
    // Get some more info for the mountpoint to display, if any
  }

  render() {
    console.log('props in streaming test', this.props);
    return (
      <div>
        <button style={{ margin: 5, backgroundColor: 'green' }} text="List Stream" onClick={this.listMountPoint} />
        <button style={{ margin: 5, backgroundColor: 'green' }} text="Get Stream Info" onClick={this.getStreamInfo} />
        <button style={{ margin: 5, backgroundColor: 'green' }} text="Watch Stream" onClick={this.watchStream} />
        <video
          id="remote-stream"
          style={{ height: 200, width: 200, background: 'black' }}
          autoPlay
          controls
          playsInline
        />
      </div>
    );
  }
}
export default Streaming;
