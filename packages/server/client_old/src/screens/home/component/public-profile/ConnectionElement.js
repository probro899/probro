import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

const ConnectionElement = (props) => {
  const { sendMessage, connectMentor, type, loading } = props;
  console.log('type in propfile connection element', type);
  switch (type) {
    case 'connected':
      return (
        <>
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
        </>
      );
    case 'pending':
      return (
        <Button
          text="Pending"
          large
          fill
          icon="follower"
        />
      );
    case 'incoming':
      return (
        <Button
          text="Accept"
          loading={loading}
          disabled={loading}
          large
          fill
          onClick={() => connectMentor('accept')}
          intent="success"
          icon="following"
        />
      );
    case 'deleted':
      return (
        <Button
          onClick={() => connectMentor('deleted')}
          text="Connect"
          large
          loading={loading}
          disabled={loading}
          fill
          intent="primary"
          icon="new-person"
        />
      );
    default:
      return (
        <Button
          onClick={() => connectMentor('request')}
          text="Connect"
          large
          loading={loading}
          disabled={loading}
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
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default ConnectionElement;
