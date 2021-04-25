import React from 'react';
import RangeSlider from '../../../../common/RangeSlider';
import { uploadFile } from '../../../../common/utility-functions';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
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
      loading: false,
      imageUrl: `${ENDPOINT}/assets/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}`,
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
    this.setState({ zoomValue: e });
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

    this.setState({ loading: true });
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
      const res = await uploadFile("profile", file, account.sessionId);
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
      this.setState({ loading: false });
      clickEditCover('reposition');
    } catch (e) {
      alert('Sorry your task could not be performed.');
    }
  }
  cancelReposition = () => {
    //cancel reposition
  }

  render() {
    const { minScale, zoomValue, loading } = this.state;
    return (
      <div
        className="cover-pic-edit-mode"
      >
        <canvas id="mainCanvas" height={400} width={1200} />
        <div className="edit-cover">
          <Button
            onClick={this.cancelReposition}
            icon={<AiOutlineClose size={20}/>}
            buttonStyle="btn--danger--solid"
            buttonSize="btn--small"
            loading={loading}
          />
          <Button
            onClick={this.saveImage}
            icon={<AiOutlineCheck size={20}/>}
            buttonSize="btn--small"
            loading={loading}
          />
        </div>
        <div className="pc-zoom-slider">
          <RangeSlider
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
