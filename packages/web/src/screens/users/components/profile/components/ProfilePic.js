/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FileInput from './FileInput';
import { ENDPOINT } from '../../../../../config';

const file = require('../../../../../assets/icons/512h/uploadicon512.png');

class ProfilePic extends React.Component {
  state = {
    picUrl: file,
  };

  uploadImage = async (data) => {
    const { account } = this.props;
    const formData = new FormData();
    formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
    formData.append('image', data);
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
        console.log(res);
        this.setState({
          picUrl: `${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${res.data}`,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { picUrl } = this.state;
    // console.log(this.props.userDetail);
    return (
      <div className="profilePic">
        <img src={picUrl} alt="profile of the user" />
        <FileInput onChange={this.uploadImage} />
      </div>
    );
  }
}

ProfilePic.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfilePic;
