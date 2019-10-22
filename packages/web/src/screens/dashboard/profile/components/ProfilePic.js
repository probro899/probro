/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FileInput from './FileInput';
import { ENDPOINT } from '../../../../config';
import RoundPicture from '../../../../components/RoundPicture';

const file = require('../../../../assets/icons/512h/uploadicon512.png');

class ProfilePic extends React.Component {
  state = {};

  componentDidUpdate(prevProps) {
    const { userDetail } = this.props;
    if (userDetail.image !== prevProps.userDetail.image) {
      this.checkOrientation();
    }
  }

  uploadImage = async (data) => {
    const {
      account,
      apis,
      userDetail,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const formData = new FormData();
    formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
    formData.append('file', data);
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
          image: res.data,
        });
        if (userDetail.id) {
          updateDatabaseSchema('UserDetail', {
            id: userDetail.id,
            image: res.data,
          });
        } else {
          addDatabaseSchema('UserDetail', {
            id: Date.now(),
            type: 'mentee',
            image: res.data,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { userDetail, account } = this.props;
    const imgUrl = userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${userDetail.image}` : file;
    return (
      <div className="profilePic">
        <RoundPicture imgUrl={imgUrl} />
        <FileInput onChange={this.uploadImage} />
      </div>
    );
  }
}

ProfilePic.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  userDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default ProfilePic;
