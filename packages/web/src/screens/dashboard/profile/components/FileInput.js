import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

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
        <Icon icon={IconNames.PLUS} intent={Intent.PRIMARY} iconSize="30" color="white" />
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
