import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import client from '../../../socket';
import * as actions from '../../../actions';
import Tools from './Tools';
import { minimizeCanvas, maximizeCanvas } from './helper-functions';

const fabric = require('fabric');

class DrawingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apis: {},
      canvas: {},
      anyObjectActive: false,
      color: '#000',
      draw: false,
      rect: false,
      mouseDown: false,
      text: false,
      straightLine: false,
      maximize: false,
      canvasHistory: [],
      canvasDeleteHistory: [],
      redoing: false,
      screenSize: {
        height: 500,
        width: 500,
      }
    };
    this.previousPoint = { x: 0, y: 0 };
  }

  async componentDidMount() {
    const { updateNav } = this.props;
    const apis = await client.scope('Mentee');
    const canvas = new fabric.fabric.Canvas('mainCanvas', { preserveObjectStacking: true, selection: false, backgroundColor: 'white' });
    canvas.freeDrawingBrush.width = 2;
    canvas.on('mouse:down', (e) => {
      this.onMouseDown(e);
    });
    canvas.on('mouse:move', (e) => {
      this.onMouseMove(e);
    });
    canvas.on('mouse:up', (e) => {
      this.onMouseUp(e);
    });

    canvas.on('object:added', (e) => {
      this.canvasObjectAltered(e);
    });

    canvas.on('object:modified', (e) => {
      this.canvasObjectAltered(e);
    });

    this.setState({ apis, canvas });

    updateNav({
      schema: 'sideNav',
      data: { name: 'Drawing Board' },
    });

    // listen for escape when fullscreen
    document.getElementById('drawingWrapper').addEventListener('fullscreenchange', this.changeFullScreen);
    // window.addEventListener('resize', this.screenResize);
    this.screenResize();
  }

  componentWillUnmount() {
    document.getElementById('drawingWrapper').removeEventListener('fullscreenchange', this.changeFullScreen);
    // window.removeEventListener('resize', this.screenResize);
  }

  toggleStraightLine = () => {
    const { straightLine, draw, canvas } = this.state;
    if (draw) { canvas.isDrawingMode = false; }
    this.setState({
      straightLine: !straightLine,
      rect: false,
      draw: false,
      text: false,
    });
  }

  toggleFreeDraw = () => {
    const { canvas, draw, color } = this.state;
    canvas.isDrawingMode = !draw;
    canvas.freeDrawingBrush.color = color;
    this.setState({
      canvas,
      draw: !draw,
      rect: false,
      text: false,
      straightLine: false,
    });
  }

  toggleRect = () => {
    const { rect, draw, canvas } = this.state;
    if (draw) { canvas.isDrawingMode = false; }
    this.setState({
      rect: !rect,
      draw: false,
      text: false,
      straightLine: false,
    });
  }

  toggleText = () => {
    const { text, draw, canvas } = this.state;
    if (draw) { canvas.isDrawingMode = false; }
    this.setState({
      text: !text,
      draw: false,
      rect: false,
      straightLine: false,
    });
  }

  onMouseDown = (e) => {
    const { canvas, rect, text, color, straightLine, draw } = this.state;
    if (!draw && !rect && !text && !straightLine) {
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        this.setState({
          anyObjectActive: true,
          color: activeObj.stroke || activeObj.fill || '#000',
        });
      } else if (!activeObj) {
        this.setState({
          anyObjectActive: false,
          color: '#000',
        });
      }
    } else {
      if (rect || straightLine || text) {
        // prevent moving of objects while rectangle
        canvas._objects.map((obj) => {
          if (obj.cacheKey === 'straightLine' || obj.path || obj.cacheKey === 'rect' || obj.cacheKey === 'text' || obj.cacheKey === 'image') {
            obj.lockMovementX = true;
            obj.lockMovementY = true;
          }
        });
      }
      if (rect || straightLine) {
        // if create rectangle and straight line button is selected
        const square = new fabric.fabric.Rect({
          width: 0,
          height: 0,
          cacheKey: 'rect',
          left: e.pointer.x,
          top: e.pointer.y,
          fill: color,
        });
        canvas.add(square);
        canvas.setActiveObject(square);
        canvas.renderAll();
      }
      if (text) { this.addText(e); }
      this.setState({ mouseDown: true });
      this.previousPoint = e.pointer;
    }
  }

  onMouseMove = (e) => {
    const { canvas, straightLine, draw, rect, mouseDown } = this.state;
    // if (draw && mouseDown) {
    //   this.drawPath(canvas.lowerCanvasEl.getContext('2d'), e);
    // }
    if (straightLine && mouseDown) {
      this.drawLine(canvas.lowerCanvasEl.getContext('2d'), e);
    }
    if (rect && mouseDown) {
      this.drawRectangle(e);
    }
  }

  onMouseUp = (e) => {
    const { rect, text, canvas, straightLine, anyObjectActive } = this.state;
    if (rect || straightLine || text) {
      // release the prevention of moving of objects while rectangle
      canvas._objects.map((obj) => {
        if (obj.cacheKey === 'straightLine' || obj.path || obj.cacheKey === 'rect' || obj.cacheKey === 'text' || obj.cacheKey === 'image') {
          obj.lockMovementX = false;
          obj.lockMovementY = false;
        }
      });
      const obj = canvas.getActiveObject();
      obj.setCoords();
      if (!rect && !text) {
        canvas.discardActiveObject();
      }
      canvas.renderAll();
    }
    if (straightLine) {
      this.createLine(e);
    }
    this.setState({
      mouseDown: false,
      text: false,
      rect: false,
      anyObjectActive: rect || text || anyObjectActive,
    });
  }

  drawRectangle = (e) => {
    const { canvas } = this.state;
    const w = Math.abs(e.pointer.x - this.previousPoint.x);
    const h = Math.abs(e.pointer.y - this.previousPoint.y);
    if (!w || !h) { return false; }
    const obj = canvas.getActiveObject();
    if (this.previousPoint.x > e.pointer.x) {
      obj.set({ left: Math.abs(e.pointer.x) });
    }
    if (this.previousPoint.y > e.pointer.y) {
      obj.set({ top: Math.abs(e.pointer.y) });
    }
    obj.set('width', w).set('height', h);
    canvas.renderAll();
  }

  addInitialAnimation = () => {
    const { canvas, screenSize } = this.state;
    fabric.fabric.Image.fromURL('/assets/graphics/logo.svg', (myImg) => {
      const img1 = myImg.set({ cacheKey: 'logo', left: screenSize.width - 130, top: screenSize.height - 50, scaleX: 0.2, scaleY: 0.2, selectable: false, opacity: 0.8 });
      canvas.add(img1);
    });
  }

  removeInitialAnimation = () => {
    const { canvas } = this.state;
    canvas.remove(canvas._objects.find(o => o.cacheKey === 'logo'));
    canvas.renderAll();
  }

  colorChange = (e) => {
    const { canvas, anyObjectActive } = this.state;
    canvas.freeDrawingBrush.color = e.target.value;
    if (anyObjectActive && canvas.getActiveObject()) {
      const activeObj = canvas.getActiveObject();
      if (activeObj.cacheKey === 'text' || activeObj.cacheKey === 'rect') {
        activeObj.set('fill', e.target.value);
      } else {
        activeObj.set('stroke', e.target.value);
      }
      canvas.renderAll();
    }
    this.setState({
      canvas,
      color: e.target.value,
    });
  }

  clearCanvas = () => {
    const { canvas } = this.state;
    canvas.clear();
    // reset the color of canvas background
    canvas.backgroundColor = 'white';
    this.addInitialAnimation();
    this.setState({
      canvas,
    });
  }

  deleteObject = () => {
    const { canvas } = this.state;
    this.state.canvasDeleteHistory.push(canvas.getActiveObject());
    this.state.canvasHistory = [];
    canvas.remove(canvas.getActiveObject());
    canvas.renderAll();
    this.setState({
      anyObjectActive: false,
    });
  }

  addText = (e) => {
    const { canvas, color } = this.state;
    const textbox = new fabric.fabric.IText('Enter Text', {
      left: e.pointer.x,
      top: e.pointer.y,
      fontSize: 18,
      cacheKey: 'text',
      fill: color,
    });
    
    textbox.on("editing:entered", () => this.textEditEntering(textbox));
    textbox.on("editing:exited", () => this.textEditEntering(textbox));

    canvas.add(textbox).setActiveObject(textbox);
    canvas.renderAll();
  }

  textEditEntering = (obj) => {
    console.log("entered", obj);
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
      };
      img.src = reader.result;
    };
    if (f) {
      reader.readAsDataURL(f);
    }
    this.setState({ rect: false, straightLine: false, text: false, draw: false });
  }

  createLine = (e) => {
    const { canvas, color } = this.state;
    const obj = new fabric.fabric.Line([this.previousPoint.x - 1, this.previousPoint.y - 1, e.pointer.x - 1, e.pointer.y - 1], {
      stroke: color,
      strokeWidth: 2,
      cacheKey: 'straightLine',
    });
    canvas.add(obj);
    canvas.renderAll();
  }

  drawLine = (ctx, e) => {
    const { color, canvas } = this.state;
    // clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.renderAll();
    ctx.beginPath();
    ctx.moveTo(this.previousPoint.x, this.previousPoint.y);
    ctx.lineTo(e.pointer.x, e.pointer.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  toggleMaximization = () => {
    const { maximize } = this.state;
    if (!maximize) {
      maximizeCanvas(document.getElementById("drawingWrapper"));
    } else {
      minimizeCanvas();
    }
    this.setState({ maximize: !maximize });
  }

  changeFullScreen = (e) => {
    if (!document.fullscreenElement) {
      this.setState({ maximize: false });
    }
  }

  canvasObjectAltered = (e) => {
    if (!this.state.redoing) {
      this.state.canvasHistory = [];
      this.state.canvasDeleteHistory = [];
    }
    this.state.redoing = false;
  }

  canvasUndo = () => {
    const { canvas, canvasDeleteHistory } = this.state;
    if (canvasDeleteHistory.length > 0) {
      canvas.add(canvasDeleteHistory.pop());
      canvas.renderAll();
      return;
    }
    if (canvas._objects.length > 1) {
      canvas.discardActiveObject();
      this.state.canvasHistory.push(canvas._objects.pop())
      canvas.renderAll();
    }
  }

  canvasRedo = () => {
    const { canvasHistory, canvas } = this.state;
    if (canvasHistory.length > 0) {
      this.state.redoing = true;
      canvas.add(canvasHistory.pop());
      canvas.renderAll();
    }
  }

  screenResize = _.debounce(() => {
    const { canvas } = this.state;
    const elem = document.getElementById("canvasWrapper");
    const height = elem.offsetHeight;
    const width = elem.offsetWidth;
    this.setState({ screenSize: { height, width }});
    canvas.setHeight(height);
    canvas.setWidth(width);

    this.removeInitialAnimation();
    this.addInitialAnimation();
  }, 80);

  render() {
    const {
      draw, anyObjectActive, straightLine, color, canvas, text,
      apis, rect, maximize,
      screenSize,
    } = this.state;
    const { database, account, addDatabaseSchema } = this.props;
    return (
      <div className="drawing-board bro-right">
        <div className="drawing-wrapper" id="drawingWrapper">
          <div className="pc-drawing-wrapper">
            <div id="canvasWrapper" className="draw-canvas pc-draw-col">
              <canvas
                id="mainCanvas"
                height={screenSize.height}
                width={screenSize.width}
              />
            </div>
            <Tools
              canvasRedo={this.canvasRedo}
              canvasUndo={this.canvasUndo}
              draw={this.toggleFreeDraw}
              drawActive={draw}
              text={text}
              apis={apis}
              straightLine={straightLine}
              drawStraight={this.toggleStraightLine}
              colorChange={this.colorChange}
              clear={this.clearCanvas}
              anyObjectActive={anyObjectActive}
              onDelete={this.deleteObject}
              textToggle={this.toggleText}
              color={color}
              addRect={this.toggleRect}
              rect={rect}
              account={account}
              toggleMaximization={this.toggleMaximization}
              database={database}
              fileUpload={this.fileUpload}
              canvas={canvas}
              maximize={maximize}
              addDatabaseSchema={addDatabaseSchema}
            />
          </div>
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
