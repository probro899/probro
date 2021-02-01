import React from 'react';
import PropTypes from 'prop-types';
import { ControlGroup } from '@blueprintjs/core';
import Input from './Input';
import Button from './Button';
import Taginput from './Taginput';
import Select from './Select';
import DateField from './DateField';
import Textarea from './Textarea';
import Fileinput from './FormFileInput';

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
    case 'select':
      return (<Select {...props} />);
    case 'date':
      return (<DateField {...props} />);
    case 'textarea':
      return (<Textarea {...props} />);
    case 'image':
      return (<Fileinput {...props} />);
    default:
      return null;
  }
};

Element.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Control extends React.Component {
  state = {
    error: null,
    loading: false,
    message: null,
    fields: {},
    data: [],
  };

  componentDidMount() {
    const { data } = this.props;
    const fields = data.filter((obj) => {
      if (obj.fieldtype === 'input'
      || obj.fieldtype === 'select'
      || obj.fieldtype === 'tagInput'
      || obj.fieldtype === 'textarea'
      || obj.fieldtype === 'date') {
        return obj;
      }
    }).map((obj) => {
      if (obj.fieldtype === 'tagInput') {
        return { [obj.id]: obj.val ? obj.val : [] };
      }
      if (obj.fieldtype === 'date') {
        return { [obj.id]: obj.val ? obj.val : new Date() };
      }
      if (obj.fieldtype === 'image') {
        return { [obj.id]: obj.val ? obj.val : {} };
      }
      return { [obj.id]: obj.val ? obj.val : '' };
    }).reduce((obj, e) => {
      obj[Object.keys(e)[0]] = Object.values(e)[0];
      return obj;
    }, {});
    this.setState({
      fields,
      data,
    });
  }

  onChange = (key, value) => {
    const { fields } = this.state;
    this.setState({ fields: { ...fields, [key]: value } });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { callback } = this.props;
    const { fields, data } = this.state;
    let err = false;
    data.map((obj) => {
      if (obj.required && fields[obj.id].replace(/\s/g, '').length === 0) {
        err = true;
        this.setState({
          error: 'Fill the required field(*)',
        });
      }
      return obj;
    });
    if (err) {
      return;
    }
    this.setState({ loading: true });
    const res = await callback(fields);
    if (res.response === 200) {
      this.setState({ loading: false, error: null, message: res.message });
    } else {
      this.setState({ loading: false, error: res.error });
    }
  }

  render() {
    const { data, fields } = this.state;
    return (
      <form
        className="form-control"
        onSubmit={this.onSubmit}
      >
        <ControlGroup
          className="pc-control-group"
          fill
        >
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
        </ControlGroup>
      </form>
    );
  }
}

Control.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Control;
