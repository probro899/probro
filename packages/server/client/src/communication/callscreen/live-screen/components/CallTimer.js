/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

class CallTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timerCount: 0, isTimerStart: false };
  }

  componentWillReceiveProps(props) {
    const { webRtc } = props;
    const { isTimerStart } = this.state;
    if (webRtc.localCallHistory.startTime && !isTimerStart) {
      const timer = setInterval(() => this.setState({ timerCount: this.state.timerCount + 1 }), 1000);
      this.setState({ isTimerStart: true, timer });
    }
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  render() {
    // console.log('props in timer', this.props);
    const { timerCount } = this.state;
    const mins = Math.floor(timerCount / 60);
    const secs = timerCount % 60;
    const hrs = Math.floor(mins / 60);
    const showZeroSec = secs < 10;
    const showZeroMins = mins < 10;
    const showMinusDoubleZero = mins === 0;
    return (
      <div style={{ marginLeft: 10 }}>
        <span>{`${hrs ? `${hrs}h:` : ''}${showMinusDoubleZero ? '00' : (showZeroMins ? '0' : '')}${mins || ''}m:${showZeroSec ? '0' : ''}${secs}s`}</span>
      </div>
    );
  }
}

export default CallTimer;
CallTimer.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
