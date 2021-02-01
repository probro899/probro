import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../common/utility-functions/Button/Button';

const ConnectionElement = (props) => {
  const { sendMessage, connectMentor, type, loading, isSearch } = props;

  switch (type) {
    case 'connected':
      return (
        <div>
          {!isSearch && <Button
            type="button"
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            loading={false}
            title="Connected"
          />
          }
          <Button
            onClick={sendMessage}
            type="button"
            buttonStyle="btn--primary--solid"
            buttonSize="btn--small"
            loading={false}
            title="Message"
          />
        </div>
      );
    case 'pending':
      return (
        <Button
          onClick={() => { }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          loading={false}
          title="Pending"
          iconPosition="left"
        />
      );
    case 'incoming':
      return (
        <Button
          onClick={() => connectMentor('accept')}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn--small"
          loading={loading}
          title="Accept"
          iconPosition="left"
        />
      );
    case 'deleted':
      return (
        <Button
          onClick={() => connectMentor('deleted')}
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--small"
          loading={loading}
          title="Connect"
          iconPosition="left"
        />
      );
    default:
      return (
        <Button
          onClick={() => connectMentor('request')}
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--small"
          loading={loading}
          title="Connect"
          iconPosition="left"
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
