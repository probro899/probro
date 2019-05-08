import React from 'react';
import PropTypes from 'prop-types';
import { Button, Intent, Spinner, Label } from '@blueprintjs/core';

const CustomButton = (props) => {
  const {
    text,
    class_,
    mainFormHandler,
    schema,
    form,
    apis
  } = props;

  return (
    <div className="btn-group">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {form[schema].loading && <Spinner intent={Intent.PRIMARY} size={40} /> }
        {form[schema].error && <Label style={{ fontSize: 16, color: 'red' }}>{form[schema].error}</Label>}
      </div>
      <Button
        text={text}
        intent={Intent.PRIMARY}
        fill
        large
        onClick={() => mainFormHandler(schema, apis)}
        className={class_}
        disabled={form[schema].loading}
      />
    </div>
  );
};
CustomButton.defaultProps = {
  class_: null,
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  class_: PropTypes.string,
  mainFormHandler: PropTypes.func.isRequired,
  schema: PropTypes.string.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default CustomButton;
