import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from '@blueprintjs/core';

const CustomButton = (props) => {
  const { onSubmit, data, state } = props;

  return (
    <div className="btn-group">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {state.error && <Label style={{ fontSize: 16, color: 'red' }}>{state.error}</Label>}
        {state.message && <Label style={{ fontSize: 16, color: 'green' }}>{state.message}</Label>}
      </div>
      <Button
        fill
        large
        onClick={onSubmit}
        loading={state.loading}
        disabled={state.loading}
        {...data}
      />
    </div>
  );
};

CustomButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default CustomButton;
