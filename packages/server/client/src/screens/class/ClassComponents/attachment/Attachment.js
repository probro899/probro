import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../../common';
import { uploadFile } from '../../../../common/utility-functions';
import structure from './structure';

class Attachment extends React.Component {
  state = {};

  uploadAttachment = async (data) => {
    if (!data.attachment) return { response: 400, error: 'Choose a file' };
    const { account, apis, addDatabaseSchema, boardId, task } = this.props;
    try {
      const res = await uploadFile('board', data.attachment, account.sessionId, false);
      if (res.status === 200) {
        const info = {
          userId: account.user.id,
          timeStamp: Date.now(),
          name: data.name,
          boardColumnCardId: task.id,
          url: res.data,
        };
        const apiRes = await apis.addBoardColumnCardAttachment({ ...info, broadCastId: `Board-${boardId}` });
        addDatabaseSchema('BoardColumnCardAttachment', { ...info, id: apiRes, user: { user: account.user } });
      }
      return { response: 200, message: 'Uploaded' };
    } catch (e) {
      return { response: 400, error: 'Please, make sure you select an attachment' };
    }
  }

  render() {
    return (
      <div style={{ padding: '5px', minWidth: '300px' }}>
        <Form callback={this.uploadAttachment} data={structure} />
      </div>
    );
  }
}

Attachment.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
};

export default Attachment;
