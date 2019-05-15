import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from '@blueprintjs/core';
import Input from './Input';
import Button from './Button';

const Element = (props) => {
  const { data } = props;
  if (!data.fieldtype) {
    return null;
  }
  switch (data.fieldtype) {
    case 'input':
      return (<Input {...props} />);
    case 'button':
      return (<Button {...props} />);
    default:
      return null;
  }
};

class Form extends React.Component {
  state = {
    error: null,
    loading: false,
    fields: {},
  };

  componentWillMount = () => {
    const { data } = this.props;
    const fields = data.filter((obj) => {
      if (obj.fieldtype === 'input') {
        return { [obj.id]: '' };
      }
    }).map((obj) => {
      if (obj.fieldtype === 'input') {
        return { [obj.id]: '' };
      }
    });
    this.setState({
      fields: { ...fields },
    });
  }

  onChange = (key, value) => {
    const { fields } = this.state;
    this.setState({ fields: { ...fields, [key]: value } });
  }

  onSubmit = async () => {
    const { callback } = this.props;
    const { fields } = this.state;
    this.setState({ loading: true });
    const res = await callback(fields);
    if (res.response === 200) {
      this.setState({ loading: false, error: null });
    } else {
      this.setState({ loading: false, error: res.error });
    }
  }

  render() {
    const { data } = this.props;
    const { fields } = this.state;
    return (
      <form>
        <FormGroup>
          {
            data.map((obj, idx) => (
              <Element
                key={idx}
                data={obj}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                value={fields[obj.id]}
                state={this.state}
              />
            ))
          }
        </FormGroup>
      </form>
    );
  }
}

Form.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Form;
