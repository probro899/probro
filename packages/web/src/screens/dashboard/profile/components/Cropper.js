import React from 'react';
import { Slider } from '@blueprintjs/core';
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
    }, { hasBorders: false, top: canvas.height / 2, left: canvas.width / 2, hasControls: false });
    this.setState({
      canvas,
    });
  }

  centerBackgroundImage = (obj, canvas) => {
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
    // console.log(e, canvas);
    this.setState({
      canvas,
      zoomValue: e,
    });
  }

  render() {
    const { clickEditCover } = this.props;
    const { minScale, zoomValue } = this.state;
    return (
      <div
        className="cover-pic-edit-mode"
      >
        <canvas id="mainCanvas" height={400} width={1200} />
        <div className="edit-cover">
          <div role="menu" tabIndex="0" onKeyDown={() => false} onClick={() => clickEditCover('reposition')}>
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
