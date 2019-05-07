import React from 'react';
import { FormGroup } from '@blueprintjs/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { keyToLabel } from '../config';
import Input from './Input';
import Button from './Button';
import FileInput from './FileInput';

const Element = (props) => {
  const {
    label,
    type,
    value,
    schema,
    form,
  } = props;
  switch (type) {
    case 'input':
      return (<Input label_={keyToLabel[label]} value={value} schema={schema} {...props} />);
    case 'button':
      return (<Button text={label} form={form} schema={schema} {...props} />);
    case 'fileInput':
      return (<FileInput label_={keyToLabel[label]} value={value} schema={schema} {...props} />);
    default:
      return (<div>error</div>);
  }
};

class Form extends React.Component {
  state = {}

  render() {
    const { data, schema } = this.props;
    const formKeys = Object.keys(data);
    const dataKeys = formKeys.filter((obj) => {
      return (
        (obj !== 'success' && obj !== 'loading' && obj !== 'error') ? obj : null
      );
    });
    // const dataValues = Object.values(data);
    return (
      <FormGroup
        helperText="Please fill the above form to update the details."
        labelFor="text-input"
        labelInfo="(required)"
      >
        {
          dataKeys.map((obj, idx) => {
            const type = 'input';
            // obj === 'profilePicture' ? 'fileInput' : 'input';
            return (
              <Element key={idx} label={obj} type={type} schema={schema} value={obj} {...this.props} />
            );
          })
        }
        <Element label="Submit" type="button" schema={schema} {...this.props} />
      </FormGroup>
    );
  }
}

Form.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  schema: PropTypes.string.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Form);
