import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, HTMLSelect, Popover } from '@blueprintjs/core';
import SelectTask from './SelectTask';
import { ENDPOINT } from '../../../../config';

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fileInputRef = React.createRef();
  }

  uploadImage = () => {
    this.fileInputRef.current.click();
  }

  saveImage = async (data) => {
    const { canvas, account, addDatabaseSchema, apis } = this.props;
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
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'board' }));
      formData.append('file', file);
      const res = await axios({
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        method: 'post',
        url: `${ENDPOINT}/web/upload-file`,
        data: formData,
      });
      if (res.status === 200) {
        const info = {
          userId: account.user.id,
          timeStamp: Date.now(),
          name: 'Canvas Print',
          boardColumnCardId: parseInt(data.task, 10),
          url: res.data,
        };
        const apiRes = await apis.addBoardColumnCardAttachment({ ...info, broadCastId: `Board-${data.class}` });
        // console.log(info, apiRes, addDatabaseSchema);
        addDatabaseSchema('BoardColumnCardAttachment', { ...info, id: apiRes });
      }
      return { response: 200, message: 'Uploaded' };
    } catch (e) {
      return { response: 400, error: 'Network issues' };
    }
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
          <Popover content={<SelectTask callback={this.saveImage} database={database} />}>
            <Button text="save" large intent="success" />
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  canvas: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Tools;
