import React from 'react';
import PropTypes from 'prop-types';
import { Button, HTMLSelect } from '@blueprintjs/core';

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  uploadImage = () => {
    this.fileInputRef.current.click();
  }

  render() {
    const {
      draw,
      drawActive,
      clear,
      addText,
      anyObjectActive,
      onDelete,
      color,
      colorChange,
      fileUpload,
    } = this.props;
    return (
      <div className="draw-tools">
        <div className="tool-label">
          <span>Tools</span>
        </div>
        <div className="tool-container">
          <Button intent="default" onClick={this.uploadImage} icon="media" className="i-tool" />
          <input
            ref={this.fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={fileUpload}
          />
          <Button intent="default" onClick={addText} icon="new-text-box" className="i-tool" />
          <Button
            icon="draw"
            onClick={draw}
            className="i-tool"
            intent={drawActive === true ? 'primary' : 'default'}
          />
          <HTMLSelect
            className="i-tool"
            value={color}
            options={[
              { label: 'Black', value: 'black' },
              { label: 'Red', value: 'red' },
              { label: 'Blue', value: 'blue' },
            ]}
            onChange={colorChange}
          />
          <Button
            className="i-tool"
            text="clear"
            onClick={clear}
          />
          <Button
            disabled={!anyObjectActive}
            onClick={onDelete}
            intent="danger"
            icon="trash"
            className="i-tool"
          />
        </div>
      </div>
    );
  }
}

Tools.propTypes = {
  color: PropTypes.string.isRequired,
  draw: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  anyObjectActive: PropTypes.bool.isRequired,
  drawActive: PropTypes.bool.isRequired,
  clear: PropTypes.func.isRequired,
  addText: PropTypes.func.isRequired,
  colorChange: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
};

export default Tools;
