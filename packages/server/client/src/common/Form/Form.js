import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import Taginput from '../Taginput';
import Select from '../Select';
import DateField from '../DateField';
import Textarea from '../Textarea';
import Fileinput from '../FormFileInput';
import Checkbox from '../Checkbox';
import { validator, dateValidator } from './utility-functions';

let ALLOWED_FIELDS = ['input', 'select', 'tagInput', 'checkbox', 'image', 'textarea', 'date'];

const Element = (props) => {
    const { data } = props;
    if (!data.fieldtype) return null;
    
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
    state = { error: null, loading: false, message: null, fields: {}, data: [] };

    componentDidMount = () => {
      const { data } = this.props;
      this._isMounted = true;
      const fields = data.filter((obj) => ALLOWED_FIELDS.includes(obj.fieldtype))
        .map((obj) => {
          if (obj.fieldtype === 'tagInput') {
            return { [obj.id]: obj.val ? obj.val : [] };
          }
          if (obj.fieldtype === 'date') {
            return { [obj.id]: obj.val ? obj.val : '' };
          }
          if (obj.fieldtype === 'image') {
            return { [obj.id]: obj.val ? { name: obj.val } : {} };
          }
          if (obj.fieldtype === 'checkbox') {
            return { [obj.id]: obj.val ? obj.val : false };
          }
          return { [obj.id]: obj.val ? obj.val : '' };
        })
        .reduce((obj, e) => {
          obj[Object.keys(e)[0]] = Object.values(e)[0];
          return obj;
        }, {});
      this.setState({ fields, data });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      const { fields } = this.state;
      if (prevProps !== this.props) this.setState({ data: this.props.data, fields: fields });
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
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            switch (obj.fieldtype) {
                case 'date':
                    if (!dateValidator(fields[obj.id])) {
                        this.setState({ error: 'Enter a valid date', message: null });
                        return;
                    }
                    if (obj.required && !fields[obj.id]) {
                        this.setState({ error: 'Fill the required fields(*)', message: null });
                        return;
                    }
                    break;
                default:
                    if (obj.required && fields[obj.id].replace(/\s/g, '').length === 0) {
                        this.setState({ error: 'Fill the required field(*)', message: null });
                        return;
                    }
                    break;
            }
        }
        
        // test validity for special fields
        const test_valid = validator(fields, data);
        if (!test_valid.valid) {
            this.setState({ error: test_valid.message, message: null });
            return;
        }

        this.setState({ loading: true });
        const res = await callback(fields);
        if (this._isMounted) {
            if (res.response === 200) {
                this.setState({ loading: false, error: null, message: res.message });
            } else {
                this.setState({ loading: false, error: res.error, message: null });
            }
        }
    }

  render() {
    const { data, fields } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="pc-form-group">
            {
            data.map((obj, idx) => (
                <Element
                    key={`form-field${idx}`}
                    data={obj}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    value={fields[obj.id]}
                    state={this.state}
                />
            ))
            }
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Form;
