import React from 'react';
import PropTypes from 'prop-types';
import { BsCardImage, BsSquare, BsPencil } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BiText, BiUndo, BiRedo } from "react-icons/bi";
import { AiFillDelete, AiOutlineSave, AiFillTool } from "react-icons/ai";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { GrClearOption } from "react-icons/gr";
import SelectTask from './SelectTask';
import { Tooltip } from '../../../common/Form/Tooltip';
import { Button } from '../../../common/utility-functions/Button/Button';
import { uploadFile } from '../../../common/utility-functions';
import Popover from '../../../common/Popover';

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTools: false,
    };
    this.fileInputRef = React.createRef();
  }

  uploadImage = () => {
    this.fileInputRef.current.click();
  }

  toggleTools = () => {
    this.setState({
      showTools: !this.state.showTools,
    })
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
      const res = await uploadFile('board', file, account.sessionId, false);
      if (res.status === 200) {
        const info = {
          userId: account.user.id,
          timeStamp: Date.now(),
          name: data.name,
          boardColumnCardId: parseInt(data.task, 10),
          url: res.data,
        };
        const apiRes = await apis.addBoardColumnCardAttachment(
          { ...info, broadCastId: `Board-${data.class}` }
        );
        addDatabaseSchema('BoardColumnCardAttachment', { ...info, user: { user: account.user }, id: apiRes });
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
      toggleMaximization,
      maximize,
      rect,
      database,
      canvasUndo,
      canvasRedo,
      apis,
    } = this.props;
    return (
      <div className="draw-tools pc-draw-col">
        {/* <div className="tool-label">
          <span>Tools</span>
        </div> */}
        <div className="tool-container pc-desktop">
          <div className="pc-create-tool pc-tool-group">
            <div className="pc-draw-btn-wrapper pc-draw-btn">
              <Tooltip content="Draw" position="left">
                <Button
                  icon={<BsPencil />}
                  onClick={draw}
                  type="button"
                  className="i-tool"
                  buttonSize="btn--small"
                  buttonStyle={drawActive ? 'btn--primary--solid' : 'btn-drawing-icon'}
                />
              </Tooltip>
              <Tooltip content="Pick a color" position="left">
                <input
                  value={color}
                  type="color"
                  onChange={colorChange}
                />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Image" position="left">
                <Button
                  onClick={this.uploadImage}
                  icon={<BsCardImage />}
                  className="i-tool"
                  type="button"
                  buttonStyle="btn-drawing-icon"
                  buttonSize="btn--small"
                />
              </Tooltip>
              <input
                ref={this.fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={fileUpload}
              />
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Draw Line" position="left">
                <Button
                  onClick={drawStraight}
                  className="i-tool"
                  type="button"
                  buttonStyle={straightLine ? 'btn--primary--solid' : 'btn-drawing-icon'}
                  buttonSize="btn--small"
                  icon={<HiOutlineArrowNarrowRight />}
                  className="i-tool"
                />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Add Text" position="left">
                <Button
                  type="button"
                  buttonStyle={text ? 'btn--primary--solid' : 'btn-drawing-icon'}
                  onClick={textToggle} icon={<BiText />}
                  buttonSize="btn--small"
                  className="i-tool" />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Rectangle" position="left">
                <Button
                  type="button"
                  buttonStyle={rect ? 'btn--primary--solid' : 'btn-drawing-icon'}
                  onClick={addRect}
                  buttonSize="btn--small"
                  icon={<BsSquare />}
                  className="i-tool" />
              </Tooltip>
            </div>

          </div>
          <div className="pc-remove-tools pc-tool-group">
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Undo" position="left">
                <Button
                  icon={<BiUndo />}
                  onClick={canvasUndo}
                  className="i-tool"
                  type="button"
                  buttonStyle="btn-drawing-icon"
                  buttonSize="btn--small"
                />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Redo" position="left">
                <Button
                  icon={<BiRedo />}
                  onClick={canvasRedo}
                  className="i-tool"
                  type="button"
                  buttonStyle="btn-drawing-icon"
                  buttonSize="btn--small"
                />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <Tooltip content="Clear Canvas" position="left">
                <Button
                  className="i-tool"
                  // title="clear"
                  icon={<GrClearOption />}
                  onClick={clear}
                  buttonStyle="btn-drawing-icon"
                  type="button"
                  buttonSize="btn--small"
                />
              </Tooltip>
            </div>
            <div className="pc-draw-btn-wrapper">
              <span style={{ display: 'inline-block' }}>
                <Button
                  disabled={!anyObjectActive}
                  onClick={onDelete}
                  buttonStyle="btn-drawing-icon-danger"
                  type="button"
                  buttonSize="btn--small"
                  icon={<AiFillDelete />}
                  className="i-tool"
                />
              </span>
            </div>
          </div>
          <div className="pc-misc-tools pc-tool-group">
            <div className="pc-draw-btn-wrapper">
              <Tooltip content={maximize ? 'Minimize' : 'Maximize'} position="left">
                <Button
                  icon={maximize ? <FiMinimize2 /> : <FiMaximize2 />}
                  onClick={toggleMaximization}
                  className="i-tool"
                  buttonStyle="btn-drawing-icon"
                  type="button"
                  buttonSize="btn--small"
                />
              </Tooltip>
            </div>
            <div className="save-wrapper pc-draw-btn-wrapper">
              <Popover
                content={<SelectTask getCardsApi={apis.getCard} callback={this.saveImage} database={database} />}
                hPosition="left"
                xAlign="left"
                yAlign="bottom"
                vPosition="top"
              >
                <Tooltip content="Save" position="left">
                  <Button
                    // title="save"
                    icon={<AiOutlineSave />}
                    buttonStyle="btn-drawing-icon"
                    type="button"
                    buttonSize="btn--small"
                  />
                </Tooltip>
              </Popover>
            </div>
          </div>
        </div>

        <div className="pc-tool-toggle">
          <Button
            onClick={this.toggleTools}
            icon={<AiFillTool />}
            className="i-tool"
            type="button"
            buttonStyle={`${this.state.showTools ? '' : "btn-drawing-icon"}`}  //"btn-drawing-icon"
            buttonSize="btn--small"
          />
        </div>
        {
          this.state.showTools && <div className="tool-container pc-mobile">
            <div className="pc-create-tool pc-tool-group">
              <div className="pc-draw-btn-wrapper pc-draw-btn">
                <Tooltip content="Free Draw" position="top">
                  <Button
                    icon={<BsPencil />}
                    onClick={draw}
                    type="button"
                    className="i-tool"
                    buttonSize="btn--small"
                    buttonStyle={drawActive ? 'btn--primary--solid' : 'btn-drawing-icon'}
                  />
                </Tooltip>
                {/* <Tooltip content="Pick a color" position="left"> */}
                <input
                  value={color}
                  type="color"
                  onChange={colorChange}
                />
                {/* </Tooltip> */}
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="image" position="top">
                  <Button
                    onClick={this.uploadImage}
                    icon={<BsCardImage />}
                    className="i-tool"
                    type="button"
                    buttonStyle="btn-drawing-icon"
                    buttonSize="btn--small"
                  />
                </Tooltip>
                <input
                  ref={this.fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={fileUpload}
                />
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="Draw Line" position="top">
                  <Button
                    onClick={drawStraight}
                    className="i-tool"
                    type="button"
                    buttonStyle={straightLine ? 'btn--primary--solid' : 'btn-drawing-icon'}
                    buttonSize="btn--small"
                    icon={<HiOutlineArrowNarrowRight />}
                    className="i-tool" />
                </Tooltip>
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="Add Text" position="top">
                  <Button
                    type="button"
                    buttonStyle={text ? 'btn--primary--solid' : 'btn-drawing-icon'}
                    onClick={textToggle} icon={<BiText />}
                    buttonSize="btn--small"
                    className="i-tool" />
                </Tooltip>
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="Square" position="top">
                  <Button
                    type="button"
                    buttonStyle={rect ? 'btn--primary--solid' : 'btn-drawing-icon'}
                    onClick={addRect}
                    buttonSize="btn--small"
                    icon={<BsSquare />}
                    className="i-tool" />
                </Tooltip>
              </div>

            </div>
            <div className="pc-remove-tools pc-tool-group">
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="undo" position="top">
                  <Button
                    icon={<BiUndo />}
                    onClick={canvasUndo}
                    className="i-tool"
                    type="button"
                    buttonStyle="btn-drawing-icon"
                    buttonSize="btn--small"
                  />
                </Tooltip>
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="redo" position="top">
                  <Button
                    icon={<BiRedo />}
                    onClick={canvasRedo}
                    className="i-tool"
                    type="button"
                    buttonStyle="btn-drawing-icon"
                    buttonSize="btn--small"
                  />
                </Tooltip>
              </div>
              <div className="pc-draw-btn-wrapper">
                <Tooltip content="clear" position="top">
                  <Button
                    className="i-tool"
                    // title="clear"
                    icon={<GrClearOption />}
                    onClick={clear}
                    buttonStyle="btn-drawing-icon"
                    type="button"
                    buttonSize="btn--small"
                  />
                </Tooltip>
              </div>
              <div className="pc-draw-btn-wrapper">
                <span style={{ display: 'inline-block' }}>
                  <Button
                    disabled={!anyObjectActive}
                    onClick={onDelete}
                    buttonStyle="btn-drawing-icon-danger"
                    type="button"
                    buttonSize="btn--small"
                    icon={<AiFillDelete />}
                    className="i-tool"
                  />
                </span>
              </div>
            </div>
            <div className="pc-misc-tools pc-tool-group">
              <div className="pc-draw-btn-wrapper">
                <Tooltip content={maximize ? 'minimize' : 'maximize'} position="top">
                  <Button
                    icon={maximize ? <FiMinimize2 /> : <FiMaximize2 />}
                    onClick={toggleMaximization}
                    className="i-tool"
                    buttonStyle="btn-drawing-icon"
                    type="button"
                    buttonSize="btn--small"
                  />
                </Tooltip>
              </div>
              <div className="save-wrapper pc-draw-btn-wrapper">
                <Popover
                  content={<SelectTask getCardsApi={apis.getCard} callback={this.saveImage} database={database} />}
                  hPosition="left"
                  xAlign="left"
                  yAlign="bottom"
                  vPosition="top"
                >
                  <Tooltip content="save" position="top">
                    <Button
                      // title="save"
                      icon={<AiOutlineSave />}
                      buttonStyle="btn-drawing-icon"
                      type="button"
                      buttonSize="btn--small"
                    />
                  </Tooltip>
                </Popover>
              </div>
            </div>
          </div>
        }

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
