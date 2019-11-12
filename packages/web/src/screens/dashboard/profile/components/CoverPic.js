import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Icon, Popover, MenuItem, Menu } from '@blueprintjs/core';
import { ENDPOINT } from '../../../../config';
import Cropper from './Cropper';
import '../../../../../../../node_modules/croppie/croppie.css';

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
    this.state = { drag: false };
    this.fileInputRef = React.createRef();
  }

  clickEditCover = async (type) => {
    const { drag } = this.state;
    if (type === 'reposition') {
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
    formData.append('file', e.target.files[0]);
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
        });
        if (userDetail.id) {
          updateDatabaseSchema('UserDetail', {
            id: userDetail.id,
            coverImage: res.data,
          });
        } else {
          addDatabaseSchema('UserDetail', {
            id: Date.now(),
            type: 'mentee',
            coverImage: res.data,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { userDetail, account, updateDatabaseSchema, apis } = this.props;
    const { drag } = this.state;
    const imgUrl = userDetail.coverImage ? `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}` : 'https://i.pinimg.com/originals/5e/80/a2/5e80a234fc2df7c84476283520dd6b18.jpg';
    if (!drag) {
      return (
        <div className="cover-pic">
          <img
            alt="cover profile of the user"
            src={imgUrl}
          />
          <div className="edit-cover">
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
          </div>
        </div>
      );
    }
    return (
      <Cropper
        clickEditCover={this.clickEditCover}
        apis={apis}
        updateDatabaseSchema={updateDatabaseSchema}
        userDetail={userDetail}
        account={account}
      />
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
