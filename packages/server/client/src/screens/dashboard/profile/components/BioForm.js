import React from 'react';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import Form from '../../../../common/Form';
import { bioSchema } from '../structure';

class BioForm extends React.Component {
  state = {};

  componentDidMount() {
    const { database, account } = this.props;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (account.user.id === obj.userId) {
        bioSchema[0].val = obj.bio;
      }
    });
  }

  render() {
    const { isOpen, onClose, callback } = this.props;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="popover-form bio">
          <div className="top">
            Write Bio
          </div>
          <Form data={bioSchema} callback={callback} />
        </div>
      </Dialog>
    );
  }
}


BioForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BioForm;
