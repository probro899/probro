import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from '../../../../common/Form';
import { portalSchema, bioSchema } from '../structure';
import { ENDPOINT } from '../../../../config';

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

  componentWillReceiveProps(nextProps) {
    const { portal } = this.state;
    const { database, portalOpen } = nextProps;
    if (nextProps.portalOpen !== portal) {
      if (nextProps.portalOpen) {
        const portalDetail = database.UserPortal.byId[portalOpen];
        portalSchema[0].val = portalDetail.title;
        portalSchema[1].val = { name: portalDetail.attachment };
        portalSchema[2].val = portalDetail.description;
        portalSchema[3].val = portalDetail.link;
      }
      this.setState({
        portal: portalOpen,
      });
    }
  }

  addPortal = async (data) => {
    const {
      apis, account, database,
      addDatabaseSchema,
      updateDatabaseSchema,
    } = this.props;
    const { portal } = this.state;
    const portalDetail = database.UserPortal.byId[portal];
    try {
      let res;
      if (data.attachment.size) {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ token: account.sessionId, fileType: 'image', content: 'profile' }));
        formData.append('file', data.attachment);
        res = await axios({
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          method: 'post',
          url: `${ENDPOINT}/web/upload-file`,
          data: formData,
        });
      }
      if (!res || res.status === 200) {
        if (typeof portal === 'number') {
          await apis.updateUserPortal([{
            ...data,
            attachment: res ? res.data : portalDetail.attachment,
            userId: account.user.id,
          }, { id: portal }]);
          updateDatabaseSchema('UserPortal', {
            ...data,
            attachment: res ? res.data : portalDetail.attachment,
            userId: account.user.id,
            id: portal,
          });
          return { response: 200, message: 'Successfully updated' };
        }
        const adRes = await apis.addUserPortal({
          ...data,
          attachment: res ? res.data : '',
          userId: account.user.id,
        });
        addDatabaseSchema('UserPortal', {
          ...data,
          attachment: res ? res.data : '',
          userId: account.user.id,
          id: adRes,
        });
        this.setState({
          portal: adRes,
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
    portalSchema[0].val = '';
    portalSchema[1].val = null;
    portalSchema[2].val = '';
    portalSchema[3].val = '';
    this.setState({
      portal: !portal,
    });
  };

  deletePortal = async () => {
    const { portal } = this.state;
    const { apis, deleteDatabaseSchema, onClose } = this.props;
    try {
      await apis.deleteUserPortal({
        id: portal,
      });
      deleteDatabaseSchema('UserPortal', { id: portal });
    } catch (e) {
      console.log('Some Error', e);
    }
    onClose();
  }

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
        <div style={{ width: '100%', padding: '2px 5px' }}>
          {
            typeof portal === 'number' && <Button onClick={this.deletePortal} minimal large text="Delete" fill intent="danger" />
          }
        </div>
      </Dialog>
    );
  }
}

BioForm.defaultProps = {
  portalOpen: null,
};

BioForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  portalOpen: PropTypes.number,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default BioForm;
