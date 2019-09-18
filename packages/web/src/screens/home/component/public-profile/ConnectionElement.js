import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const ConnectionElement = (props) => {
  const { sendMessage, connectMentor, type } = props;
  switch (type) {
    case 'connected':
      return (
        <div className="con-option">
          <Button
            text="Connected"
            large
            fill
            intent="primary"
          />
          <Button
            text="Message"
            large
            fill
            onClick={sendMessage}
          />
        </div>
      );
    case 'pending':
      return (
        <Button
          text="Pending"
          large
          fill
          icon="blocked-person"
        />
      );
    case 'incoming':
      return (
        <Button
          text="Accept"
          large
          fill
          onClick={() => connectMentor('accept')}
          intent="success"
          icon="following"
        />
      );
    default:
      return (
        <Button
          onClick={() => connectMentor('request')}
          text="Connect"
          large
          fill
          intent="primary"
          icon="new-person"
        />
      );
  }
};

ConnectionElement.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  connectMentor: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ConnectionElement;
