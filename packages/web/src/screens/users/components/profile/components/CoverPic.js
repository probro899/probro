/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Icon, Popover, MenuItem, Menu } from '@blueprintjs/core';
import { ENDPOINT } from '../../../../../config';

const SmallMenu = (onClick, userDetail) => (
  <Menu>
    <MenuItem
      text="Upload New"
      onClick={() => onClick('upload')}
    />
    <Menu.Divider />
    <MenuItem
      disabled={!userDetail.coverImage}
      text="Reposition"
      onClick={() => onClick('reposition')}
    />
  </Menu>
);

class CoverPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
      down: false,
      initialX: 0,
      initialY: 0,
      left: 0,
      top: 0,
    };
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    const { userDetail } = this.props;
    this.setState({
      top: userDetail.coverImagrY ? Number(userDetail.coverImagrY) : 0,
      left: userDetail.coverImageX ? Number(userDetail.coverImageX) : 0,
    });
  }

  mouseDown = (e) => {
    const { drag } = this.state;
    if (drag) {
      this.setState({
        down: true,
        initialX: e.clientX,
        initialY: e.clientY,
      });
    }
  }

  mouseMove = (e) => {
    const {
      initialX, down, initialY, left,
      top,
    } = this.state;
    if (down) {
      this.setState({
        left: left + (e.clientX - initialX),
        top: top + (e.clientY - initialY),
        initialX: e.clientX,
        initialY: e.clientY,
      });
    }
  }

  mouseUp = (e) => {
    e.preventDefault();
    const {
      initialX, down, initialY, left,
      top,
    } = this.state;
    if (down) {
      this.setState({
        down: false,
        left: left + (e.clientX - initialX),
        top: top + (e.clientY - initialY),
      });
    }
  }

  mouseOut = (e) => {
    const {
      initialX, down, initialY, left,
      top,
    } = this.state;
    if (down) {
      this.setState({
        down: false,
        left: left + (e.clientX - initialX),
        top: top + (e.clientY - initialY),
      });
    }
  }

  clickEditCover = async (type) => {
    const { drag, top, left } = this.state;
    const { apis, account, userDetail, updateDatabaseSchema } = this.props;
    if (type === 'reposition') {
      if (drag) {
        await apis.updateUserDetails({
          userId: account.user.id,
          coverImageX: left,
          coverImagrY: top,
        });
        updateDatabaseSchema('UserDetail', {
          id: userDetail.id,
          coverImageX: left,
          coverImagrY: top,
        });
      }
      this.setState({
        drag: !drag,
      });
      return;
    }
    this.fileInputRef.current.click();
  }

  coverChange = async (e) => {
    const {
      account,
      apis,
      userDetail,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const formData = new FormData();
    formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
    formData.append('image', e.target.files[0]);
    try {
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
          coverImage: res.data,
          coverImageX: 0,
          coverImagrY: 0,
        });
        if (userDetail.id) {
          updateDatabaseSchema('UserDetail', {
            id: userDetail.id,
            coverImage: res.data,
            coverImageX: 0,
            coverImagrY: 0,
          });
        } else {
          addDatabaseSchema('UserDetail', {
            id: Date.now(),
            type: 'mentee',
            coverImage: res.data,
            coverImageX: 0,
            coverImagrY: 0,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { userDetail, account } = this.props;
    const { left, top, drag } = this.state;
    const imgUrl = userDetail.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}` : 'https://i.pinimg.com/originals/5e/80/a2/5e80a234fc2df7c84476283520dd6b18.jpg';
    return (
      <div
        className="cover-pic"
        style={{
          boxShadow: drag && '-3px 3px 3px',
        }}
      >
        <img
          style={{
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`,
          }}
          draggable={false}
          onMouseMove={this.mouseMove}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseOut={this.mouseOut}
          alt="profile cover"
          src={imgUrl}
        />
        <div className="edit-cover">
          { drag ? (
            <div onClick={() => this.clickEditCover('reposition')}>
              <span style={{ padding: '3px', border: '1px solid white' }}>Save </span>
            </div>
          )
            : (
              <Popover
                content={SmallMenu(this.clickEditCover, userDetail)}
              >
                <div>
                  <span>Edit </span>
                  <Icon icon="edit" color="white" className="edit-icon" />
                  <input
                    ref={this.fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={this.coverChange}
                  />
                </div>
              </Popover>
            )
          }
        </div>
      </div>
    );
  }
}

CoverPic.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  userDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default CoverPic;
