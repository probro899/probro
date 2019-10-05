import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form } from '../../../../../common';
import { portalSchema, bioSchema } from '../structure';
import { ENDPOINT } from '../../../../../config';

class BioForm extends React.Component {
  state = {
    portal: false,
  };

  componentDidMount() {
    const { database, account } = this.props;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (account.user.id === obj.userId) {
        bioSchema[0].val = obj.bio;
      }
    });
  }

  addPortal = async (data) => {
    const { apis, account } = this.props;
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
      formData.append('image', data.attachment);
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
      // console.log(res, apis);
      if (res.status === 200) {
        await apis.addUserPortal({
          ...data,
          attachment: res.data,
          userId: account.user.id,
        });
        return { response: 200, message: 'Successfully added' };
      }
      return { response: 400, error: res.data };
    } catch (e) {
      return { response: 400, error: 'Something went wrong' };
    }
  }

  togglePortal = () => {
    const { portal } = this.state;
    this.setState({
      portal: !portal,
    });
  };

  render() {
    const { isOpen, onClose, callback } = this.props;
    const { portal } = this.state;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="popover-form bio">
          <div className="top">
            {portal ? 'Fill Portal Details' : 'Fill Bio Details'}
          </div>
          {portal
            ? (<div><Form data={portalSchema} callback={this.addPortal} /></div>)
            : <Form data={bioSchema} callback={callback} />
          }
        </div>
        <div
          style={{ width: '100%', padding: '0px 5px' }}
        >
          { portal
            ? <Button large text="Cancle" fill onClick={this.togglePortal} />
            : <Button large text="Add your portals" fill onClick={this.togglePortal} />
          }
        </div>
      </Dialog>
    );
  }
}

BioForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

export default BioForm;
