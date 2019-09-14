import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import Controller from '../../../controller';
import ChatElement from './chatElement';
import OutgoingCall from '../../../outgoing-call';
import AddUser from '../add-user';

const ROOT_CSS = css({
  width: '100%',
  height: window.innerHeight * 0.7,
});

class Container extends React.Component {
state={};

communicationContainerHandler = () => {
  const { webRtc } = this.props;
  switch (webRtc.communicationContainer) {
    case 'chat':
      return (
        <ScrollToBottom className={ROOT_CSS}>
          {webRtc.messages.map(obj => ChatElement(obj))}
        </ScrollToBottom>
      );
    case 'connecting':
      return <OutgoingCall {...this.props} />;
    default:
      return (
        <ScrollToBottom className={ROOT_CSS}>
          {webRtc.messages.map(obj => ChatElement(obj))}
        </ScrollToBottom>
      );
  }
}

render() {
  const { updateWebRtc, webRtc } = this.props;
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid', borderWidth: 1, borderColor: '#f5f5f5' }}>
        <div style={{ width: 'auto', marginTop: 10, padding: 2, borderTopRightRadius: 10, borderBottomRightRadius: 10, background: 'green', display: 'flex' }}>
          <Button data-tip="Add Board Member" onClick={() => updateWebRtc('addUser', true)} text="" style={{ marginLeft: 5, marginRight: 5 }} icon="new-person" intent="success" />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {webRtc.recordedBlobs.map(a => Object.values(a)[0])}
        </div>
        <div style={{ width: 'auto', marginTop: 10, padding: 2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, background: 'green' }}>
          <Controller {...this.props} />
        </div>
      </div>
      {this.communicationContainerHandler()}
      <AddUser {...this.props} />
    </div>
  );
}
}

export default Container;
Container.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
