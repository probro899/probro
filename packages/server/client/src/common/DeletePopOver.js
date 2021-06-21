import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Form/Popup';
import { Button } from './utility-functions/Button/Button';

class DeletePopOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { action, isOpen, name } = this.props;
    return (
      <Popup isOpen={isOpen} onClose={() => action('cancle')}>
        <div className="delete-popover">
          <div className="top">
            Are you sure you want to delete
            <span style={{ color: 'red' }}> {name}</span>
            ?
          </div>
          <div className="popover-button">
            <Button
              onClick={() => action('confirm')}
              type="button"
              buttonStyle="btn--danger--solid"
              buttonSize="btn--small"
              title="Delete"
            />
            <Button
              onClick={() => action('cancle')}
              type="button"
              buttonStyle="btn--primary--outline"
              buttonSize="btn--small"
              title="Cancel"
            />
          </div>
        </div>
      </Popup>
    );
  }
}

DeletePopOver.propTypes = {
  action: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default DeletePopOver;
