import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from '@blueprintjs/core';
import Input from './Input';
import Button from './Button';
import Taginput from './Taginput';

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
    case 'tagInput':
      return (<Taginput {...props} />);
    default:
      return null;
  }
};

Element.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Form extends React.Component {
  state = {
    error: null,
    loading: false,
    message: null,
    fields: {},
  };

  componentWillMount = () => {
    const { data } = this.props;
    const fields = data.filter((obj) => {
      if (obj.fieldtype === 'input') {
        return obj;
      }
    }).map((obj) => {
      if (obj.fieldtype === 'input') {
        return { [obj.id]: '' };
      }
    }).reduce((obj, e) => {
      obj[Object.keys(e)[0]] = '';
      return obj;
    }, {});
    this.setState({
      fields,
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
      this.setState({ loading: false, error: null, message: res.message });
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
