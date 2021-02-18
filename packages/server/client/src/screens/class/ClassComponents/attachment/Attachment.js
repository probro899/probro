import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../common/Form';
import { uploadFile } from '../../../../common/utility-functions';

const structure = [
  {
    id: 'name',
    fieldtype: 'input',
    name: 'Name',
    required: true,
    placeholder: 'Title',
  },
  {
    id: 'attachment',
    fieldtype: 'image',
    name: 'Attachment',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Upload',
    fill: 'fill',
    intent: 'success',
    large: 'large',
  },
];

class Attachment extends React.Component {
  state = {};

  uploadAttachment = async (data) => {
    if (!data.attachment) {
      return { response: 400, error: 'Choose a file' };
    }
    const {
      account, apis, addDatabaseSchema, boardId,
      task
    } = this.props;
    try {
      const res = await uploadFile('board', data.attachment, account.sessionId);
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
      return { response: 400, error: 'Network issues' };
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
