import React from 'react';
import PropTypes from 'prop-types';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  onChange = (e) => {
    const { fileOnchange } = this.props;
    fileOnchange(e.target.files[0]);
  };

  onClick = () => {
    this.fileInputRef.current.click();
  };

  changeStyle = (e) => {
    e.target.style.cursor = 'pointer';
  }

  render() {
    const { fileComponent } = this.props;
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
        {fileComponent}
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

export default FileInput;
FileInput.propTypes = {
  fileOnchange: PropTypes.func.isRequired,
  fileComponent: PropTypes.element.isRequired,
};
