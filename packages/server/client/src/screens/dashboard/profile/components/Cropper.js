import React from 'react';
import { Slider } from '@blueprintjs/core';
import axios from 'axios';
import { ENDPOINT } from '../../../../config';

const fabric = require('fabric');

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    const { userDetail, account } = this.props;
    this.state = {
      minScale: 1.0,
      canvas: {},
      zoomValue: 0,
      imageUrl: `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}`,
    };
  }

  componentDidMount() {
    const { imageUrl } = this.state;
    const canvas = new fabric.fabric.Canvas('mainCanvas', { selection: false, backgroundColor: 'white' });
    fabric.fabric.Image.fromURL(imageUrl, (oImg) => {
      oImg.set('originX', 'center').set('originY', 'center').set('cacheKey', 'Background');
      canvas.add(oImg);
      canvas.renderAll();
      this.centerBackgroundImage(oImg, canvas);
    }, { hasBorders: false, crossOrigin: 'Anonymous', top: canvas.height / 2, left: canvas.width / 2, hasControls: false });
    this.setState({
      canvas,
    });
  }

  centerBackgroundImage = (obj, canvas) => {
    // console.log('called', obj.scaleX);
    const canWidth = canvas.width;
    const canHeight = canvas.height;
    if (obj.left > (obj.getScaledWidth() / 2) || obj.top > (obj.getScaledHeight() / 2 ||
      obj.left < (obj.getScaledWidth() / 2 + canWidth - obj.getScaledWidth())) ||
      obj.top < (obj.getScaledHeight() / 2 + canHeight - obj.getScaledHeight())) {
      obj.scaleX += 0.01;
      obj.scaleY += 0.01;
      return this.centerBackgroundImage(obj, canvas);
    }
    obj.scaleX += 0.2;
    obj.scaleY += 0.2;
    canvas.renderAll();
    this.setState({
      minScale: obj.scaleX - 0.2,
      zoomValue: obj.scaleX,
    });
  }

  onZoom = (e) => {
    const { canvas } = this.state;
    canvas._objects[0].scaleX = e;
    canvas._objects[0].scaleY = e;
    canvas.renderAll();
    this.setState({
      canvas,
      zoomValue: e,
    });
  }

  saveImage = async () => {
    const { canvas } = this.state;
    const {
      clickEditCover,
      account,
      userDetail,
      apis,
      updateDatabaseSchema,
    } = this.props;
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
    const file = new File([u8arr], 'cover-edit.jpeg', { type: mime });
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
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
        await apis.updateUserDetails({
          userId: account.user.id,
          coverEdit: res.data,
        });
        updateDatabaseSchema('UserDetail', {
          id: userDetail.id,
          coverEdit: res.data,
        });
      }
      clickEditCover('reposition');
    } catch (e) {
      alert('Sorry your task could not be performed.');
    }
  }

  render() {
    const { minScale, zoomValue } = this.state;
    return (
      <div
        className="cover-pic-edit-mode"
      >
        <canvas id="mainCanvas" height={400} width={1200} />
        <div className="edit-cover">
          <div role="menu" tabIndex="0" onKeyDown={() => false} onClick={this.saveImage}>
            <span style={{ padding: '3px', border: '1px solid #137cbd' }}>Save </span>
          </div>
        </div>
        <div className="pc-zoom-slider">
          <Slider
            id="pcZoom"
            labelRenderer={false}
            onChange={this.onZoom}
            max={minScale + 3}
            min={minScale}
            stepSize={0.1}
            value={zoomValue}
          />
        </div>
      </div>
    );
  }
}

export default Cropper;
