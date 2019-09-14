import React from 'react';
import { Button } from '@blueprintjs/core';

export default (props) => {
  const { sendMessage, connectMentor, type } = props;
  switch (type) {
    case 'connected':
      return (
        <div>
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
