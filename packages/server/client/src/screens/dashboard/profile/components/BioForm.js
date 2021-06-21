import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../../common';
import { bioSchema } from '../structure';
import Popup from '../../../../common/Form/Popup';

class BioForm extends React.Component {
  state = {};

  render() {
    const { isOpen, onClose, callback, bio } = this.props;
    const schema = bioSchema(bio);
    return (
      <Popup isOpen={isOpen} onClose={onClose}>
        <div className="popover-form bio">
          <div className="top">Write Bio</div>
          <Form data={schema} callback={callback} />
        </div>
      </Popup>
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
