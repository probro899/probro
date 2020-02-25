import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import client from '../../../socket';
import * as actions from '../../../actions';
import Tools from './Tools';

const fabric = require('fabric');
const pcLogo = require('../../../assets/logo.png');

class DrawingBoard extends Component {
  state = {
    apis: {},
    canvas: {},
    anyObjectActive: false,
    color: 'black',
    draw: false,
  }

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    const canvas = new fabric.fabric.Canvas('mainCanvas', { preserveObjectStacking: true, selection: false, backgroundColor: 'white' });
    canvas.freeDrawingBrush.width = 2;
    canvas.on('mouse:down', () => {
      this.onCanvasClick();
    });
    this.setState({
      apis,
      canvas,
    });
    updateNav({
      schema: 'sideNav',
      data: { name: 'Drawing Board' },
    });
    this.addInitialAnimation();
  }

  componentWillUpdate(nextProps) {
    // const { webRtc } = this.props;
    const { canvas } = this.state;
    // if (webRtc.localCallHistory && webRtc.localCallHistory.mediaType === 'whiteBoard') {
    //   return;
    // }
    if (nextProps.webRtc.localCallHistory && nextProps.webRtc.localCallHistory.mediaType === 'whiteBoard') {
      const logo = canvas.getObjects().find(obj => obj.cacheKey === 'logo' && obj);
      canvas.remove(logo);
      this.addInitialAnimation();
      canvas.requestRenderAll();
    }
  }

  addInitialAnimation = () => {
    const { canvas } = this.state;
    fabric.fabric.Image.fromURL(pcLogo, (myImg) => {
      const img1 = myImg.set({ cacheKey: 'logo', left: 875, top: 0, scaleX: 0.2, scaleY: 0.2, selectable: false, opacity: 0.6 });
      canvas.add(img1);
    });
  }

  draw = () => {
    const { canvas, draw } = this.state;
    canvas.isDrawingMode = !draw;
    this.setState({
      canvas,
      draw: !draw,
    });
  }

  colorChange = (e) => {
    const { canvas } = this.state;
    canvas.freeDrawingBrush.color = e.target.value;
    this.setState({
      canvas,
      color: e.target.value,
    });
  }

  clearCanvas = () => {
    const { canvas } = this.state;
    canvas.clear();
    this.addInitialAnimation();
    this.setState({
      canvas,
    });
  }

  onCanvasClick = () => {
    const { canvas, anyObjectActive } = this.state;
    if (!anyObjectActive && canvas.getActiveObject()) {
      this.setState({
        anyObjectActive: true,
      });
    } else if (!canvas.getActiveObject()) {
      this.setState({
        anyObjectActive: false,
      });
    }
  }

  deleteObject = () => {
    const { canvas } = this.state;
    canvas.remove(canvas.getActiveObject());
    canvas.requestRenderAll();
    this.setState({
      canvas,
      anyObjectActive: false,
    });
  }

  addText = () => {
    const { canvas, color } = this.state;
    const textbox = new fabric.fabric.IText('Enter Text', {
      left: 50,
      top: 50,
      fontSize: 18,
      cacheKey: 'text',
      fill: color,
    });
    canvas.add(textbox).setActiveObject(textbox);
    canvas.isDrawingMode = false;
    this.setState({
      draw: false,
      canvas,
      anyObjectActive: true,
    });
  }

  fileUpload = (e) => {
    const { canvas } = this.state;
    const f = e.target.files[0];
    e.target.value = '';
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        let scale = 1;
        if (img.height > img.width) {
          scale = (canvas.height / 2) / img.height;
        } else {
          scale = (canvas.width / 2) / img.width;
        }
        const i = new fabric.fabric.Image(img, {
          top: canvas.height / 2,
          left: canvas.width / 2,
          scaleX: scale,
          scaleY: scale,
          originX: 'center',
          originY: 'center',
          cacheKey: 'image',
        });
        canvas.add(i);
        canvas.requestRenderAll();
        this.setState({
          canvas,
        });
      };
      img.src = reader.result;
    };
    if (f) {
      reader.readAsDataURL(f);
    }
  }

  render() {
    const {
      draw, anyObjectActive, color, canvas,
      apis,
    } = this.state;
    const { database, account, addDatabaseSchema } = this.props;
    return (
      <div className="drawing-board bro-right">
        <div className="draw-title">
          <span>White Board</span>
        </div>
        <Tools
          draw={this.draw}
          drawActive={draw}
          apis={apis}
          colorChange={this.colorChange}
          clear={this.clearCanvas}
          anyObjectActive={anyObjectActive}
          onDelete={this.deleteObject}
          addText={this.addText}
          color={color}
          account={account}
          database={database}
          fileUpload={this.fileUpload}
          canvas={canvas}
          addDatabaseSchema={addDatabaseSchema}
        />
        <div className="draw-canvas">
          <canvas
            id="mainCanvas"
            height={700}
            width={1000}
          />
        </div>
      </div>
    );
  }
}

DrawingBoard.propTypes = {
  updateNav: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(DrawingBoard);
