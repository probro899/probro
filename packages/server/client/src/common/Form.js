import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from '@blueprintjs/core';
import Input from './Input';
import Button from './Button';
import Taginput from './Taginput';
import Select from './Select';
import DateField from './DateField';
import Textarea from './Textarea';
import Fileinput from './FormFileInput';
import Checkbox from './Checkbox';

const Element = (props) => {
  const { data } = props;
  if (!data.fieldtype) {
    return null;
  }
  switch (data.fieldtype) {
    case 'input':
      return (<Input {...props} />);
    case 'checkbox':
      return (<Checkbox {...props} />);
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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      message: null,
      fields: {},
      data: [],
    };
  }

  componentDidMount = () => {
    const { data } = this.props;
    this._isMounted = true;
    const fields = data.filter((obj) => {
      if (obj.fieldtype === 'input'
        || obj.fieldtype === 'select'
        || obj.fieldtype === 'tagInput'
        || obj.fieldtype === 'image'
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
      if (obj.fieldtype === 'checkbox') {
        return { [obj.id]: obj.val ? obj.val : false };
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

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // check old vs new props
    const { fields } = this.state;
    if (prevProps !== this.props) {
      this.setState({
        data: this.props.data,
        fields: fields,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        this.setState({ error: 'Fill the required field(*)' });
      }
      return obj;
    });
    if (err) {
      return;
    }
    this.setState({ loading: true });
    const res = await callback(fields);
    if (this._isMounted) {
      if (res.response === 200) {
        this.setState({ loading: false, error: null, message: res.message });
      } else {
        this.setState({ loading: false, error: res.error });
      }
    }
  }

  render() {
    const { data, fields } = this.state;
    // console.log("data props", data);
    return (
      <form
        onSubmit={this.onSubmit}
      >
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
