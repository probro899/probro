import React from 'react';
import { TextArea, Button, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import FileInput from '../../../../../../../../common/FileInput';

class Sender extends React.Component {
state = { message: '' };

handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    const { message } = this.state;
    const { updateWebRtc, webRtc } = this.props;
    updateWebRtc('messages', [...webRtc.messages,
      {
        timeStamp: 1564478946313,
        userId: 1,
        name: 'Bhagya Sah',
        text: message,
      },
    ]);
    this.setState({ message: '' });
  }
}

fileOnchange = (e) => {
  console.log('file onchange local called', e);
}

sendMessage = () => {
  const { message } = this.state;
  const { updateWebRtc, webRtc } = this.props;
  console.log('send message called', updateWebRtc, webRtc);
  updateWebRtc('messages', [...webRtc.messages,
    {
      timeStamp: 1564478946313,
      userId: 1,
      name: 'Bhagya Sah',
      text: message,
    },
  ]);
  this.setState({ message: '' });
}

chaneMessage = (e) => {
  console.log('type messsage', e.target.value);
  this.setState({ message: e.target.value });
}

render() {
  const  { message } = this.state;
  return (
    <div style={{ display: 'flex', width: '100%', maxHeight: 200, marginTop: 5 }}>
      <div style={{ width: '100%' }}>
        <TextArea
          fill
          style={{ resize: 'None', maxHeight: 200, minHeight: 20, flex: 0.9 }}
          onChange={this.chaneMessage}
          value={message}
          onKeyPress={this.handleKeyPress}
        />
      </div>
      { message.length > 0
        ? (
          <Button
            intent="primary"
            fills
            style={{ margin: 5, width: 'auto', maxWidth: 140, flex: 0.1 }}
            rightIcon={<Icon icon="direction-right" iconSize="23" />}
            onClick={this.sendMessage}
          />
        )
        : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 50 }}>
            <div>
              <FileInput fileOnchange={this.fileOnchange} fileComponent={<Icon icon="paperclip" iconSize={20} data-tip="Attachment" style={{ curser: 'pointer' }} />} />
              <ReactTooltip />
            </div>
          </div>
        )
    }
    </div>
  );
}
}
export default Sender;
Sender.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};
