import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Popover } from '@blueprintjs/core';
import SelectTask from './SelectTask';
import { ENDPOINT } from '../../../config';

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
          name: data.name,
          boardColumnCardId: parseInt(data.task, 10),
          url: res.data,
        };
        const apiRes = await apis.addBoardColumnCardAttachment({ ...info, broadCastId: `Board-${data.class}` });
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
      textToggle,
      anyObjectActive,
      onDelete,
      color,
      colorChange,
      fileUpload,
      addRect,
      text,
      drawStraight,
      straightLine,
      rect,
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
          <Button intent={straightLine ? 'primary' : 'default'} onClick={drawStraight} icon="flow-linear" className="i-tool" />
          <Button intent={text ? 'primary' : 'default'} onClick={textToggle} icon="new-text-box" className="i-tool" />
          <Button intent={rect ? 'primary' : 'default'} onClick={addRect} icon="square" className="i-tool" />
          <Button
            icon="draw"
            onClick={draw}
            className="i-tool"
            intent={drawActive ? 'primary' : 'default'}
          />
          <input
            value={color}
            type="color"
            style={{ width: 30, border: 'none', height: '100%' }}
            onChange={colorChange}
          />
          <Button
            className="i-tool"
            style={{ boxShadow: 'none', backgroundColor: '#efefef' }}
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
          <Popover content={<SelectTask callback={this.saveImage} database={database} {...this.props} />}>
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
  textToggle: PropTypes.func.isRequired,
  colorChange: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  canvas: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Tools;
