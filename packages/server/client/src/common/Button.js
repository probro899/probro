import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './utility-functions/Button/Button';

const CustomButton = (props) => {
  const { onSubmit, data, state } = props;

  return (
    <div className="btn-group">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {state.error && <p style={{ fontSize: 16, color: 'red' }}>{state.error}</p>}
        {state.message && <p style={{ fontSize: 16, color: 'green' }}>{state.message}</p>}
      </div>
      <Button
        onClick={onSubmit}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
        title="Submit"
        loading={state.loading}
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
