import React from 'react';
import PropTypes from 'prop-types';
import { IoMdAddCircle } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.files[0]);
  };

  onClick = () => {
    this.fileInputRef.current.click();
  };

  changeStyle = (e) => {
    e.target.style.cursor = 'pointer';
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        onClick={this.onClick}
        onKeyDown={this.onClick}
        role="button"
        onMouseOver={this.changeStyle}
        onFocus={this.changeStyle}
        className="image-upload-icon"
      >
        <GrFormAdd size={20} />
        <input
          ref={this.fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
