import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../utility-functions/Button/Button';

const Actions = ({ actions }) => {
  return (
    <div className="pc-req-action">
      {actions.map((a) => (
        <Button
          onClick={a.onClick}
          type="button"
          buttonStyle={a.buttonStyle}
          buttonSize="btn--small"
          disabled={a.disabled}
          icon={a.icon}
          title={a.title}
          loading={a.loading}
      />
      ))}
    </div>
  );
};
export default Actions;
Actions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.any).isRequired,
};
