import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import * as actions from '../../actions';

class TaskOverlay extends Component {
  state = {};

  onClose = () => {
    const { _class, updateClassValue } = this.props;
    updateClassValue('overLayContent', { ..._class.overLayContent, isOpen: false });
  };

  render() {
    const { _class } = this.props;
    const { isOpen, taskContent } = _class.overLayContent;
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.onClose}
      >
        <div style={{ color: 'white', backgroundColor: 'red' }}>
          {taskContent}
        </div>
      </Dialog>
    );
  }
}

TaskOverlay.propTypes = {
  _class: PropTypes.objectOf(PropTypes.any).isRequired,
  updateClassValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownprops) => ({ ...state, ...ownprops });
export default connect(mapStateToProps, { ...actions })(TaskOverlay);
