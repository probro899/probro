import React from 'react';
import PropTypes from 'prop-types';
import {Popover} from '@blueprintjs/core';
import { MdEdit } from "react-icons/md";
import {Menu, MenuItem} from '../../../../common/Menu';
import { ENDPOINT } from '../../../../config';
import Cropper from './Cropper';
import { Spinner } from '../../../../common';
import { uploadFile } from '../../../../common/utility-functions';


const SmallMenu = (onClick, userDetail) => (
  <Menu>
    <MenuItem
      text="Upload New"
      onClick={() => onClick('upload')}
    />

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
    this.state = { drag: false, loading: false };
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
    this.setState({ loading: true });
    try {
      const res = await uploadFile("profile", e.target.files[0], account.sessionId);
      if (res.status === 200) {
        const response = await apis.updateUserDetails({
          userId: account.user.id,
          coverImage: res.data,
          coverEdit: null,
        });
        if (userDetail.id) {
          updateDatabaseSchema('UserDetail', {
            id: userDetail.id,
            coverImage: res.data,
            coverEdit: null,
          });
        } else {
          addDatabaseSchema('UserDetail', {
            id: response,
            type: 'mentee',
            coverImage: res.data,
            coverEdit: null,
          });
        }
        this.setState({ loading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { userDetail, account, updateDatabaseSchema, apis } = this.props;
    const { drag, loading } = this.state;
    const imgUrl = userDetail.coverImage ? `${ENDPOINT}/assets/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverImage}` : '/assets/graphics/default-cover.jpg';
    const editCoverUrl = userDetail.coverEdit && `${ENDPOINT}/assets/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.coverEdit}`;
    if (!drag) {
      return (
        <div className="cover-pic">
          {
            editCoverUrl ? <img alt="cover profile of the user" src={editCoverUrl} />
              : (
                <img alt="cover profile of the user" src={imgUrl} />
              )
          }
          <div className="edit-cover">
            {loading && <Spinner style={{ left: 0, top: 0, height: '100%', zIndex: 3 }} />}
            <Popover
              content={SmallMenu(this.clickEditCover, userDetail)}
            >
              <div style={{ position: 'relative' }}>
                <span>Edit </span>
                <MdEdit size={15} className="edit-icon"/>
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
