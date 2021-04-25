import React from 'react';
import PropTypes from 'prop-types';

class Taginput extends React.Component {
  state = { inputValue: '' };
  myRef = React.createRef();

  onKeyDown = (e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
        e.preventDefault();
        const { inputValue } = this.state;
        const { onChange, data, value } = this.props;
        onChange(data.id, [...value, inputValue])
        this.setState({ inputValue: '' });
    }
  }

  onChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  onClick = (e) => {
    this.myRef.current.focus();
  }

  onDeleteTag = (idx) => {
    const { onChange, value, data } = this.props;
    onChange(data.id, value.filter((o, i) => i !== idx));
  }

  render() {
    const { inputValue } = this.state;
    const { data, value } = this.props;
    return (
      <p>
        <span className="label-text">{data.name}</span>
        {data.required && <span style={{ color: 'red' }}> *</span>}
        <div className="tag-input" onClick={this.onClick}>
          {
            value.map((o, idx) => {
              return (
                <span key={`item-${idx}`} className="each-tag">
                  {o}
                  <button onClick={() => this.onDeleteTag(idx)} className="tag-del-btn">x</button>
                </span>
              )
            })
          }
          <input ref={this.myRef} onKeyDown={this.onKeyDown} onChange={this.onChange} value={inputValue} />
        </div>
      </p>
    );
  }
}

Taginput.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Taginput;
