import React from 'react';
import PropTypes from 'prop-types';
import { Button, HTMLSelect, Popover } from '@blueprintjs/core';
import SelectTask from './SelectTask';

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  uploadImage = () => {
    this.fileInputRef.current.click();
  }

  saveImage = () => {
    const { canvas } = this.props;
    const dataUrl = canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
    });
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      n -= 1;
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], 'canvas-shot.jpeg', { type: mime });
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
      database,
      account,
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
        <div className="save-wrapper">
          <Popover content={<SelectTask account={account} database={database} />}>
            <Button text="save" large onClick={this.saveImage} intent="success" />
          </Popover>
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
