import React from 'react';
import PropTypes from 'prop-types';
import { Button, Intent, Spinner, Label } from '@blueprintjs/core';

const CustomButton = (props) => {
  const { onSubmit, data, state } = props;

  return (
    <div className="btn-group">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {state.loading && <Spinner intent={Intent.PRIMARY} size={40} /> }
        {state.error && <Label style={{ fontSize: 16, color: 'red' }}>{state.error}</Label>}
      </div>
      <Button
        fill
        large
        onClick={onSubmit}
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
