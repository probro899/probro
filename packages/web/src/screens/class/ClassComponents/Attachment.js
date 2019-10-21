import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from '../../../common/Form';
import { ENDPOINT } from '../../../config';

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
    text: 'Choose a file...',
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
      task,
    } = this.props;
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ token: account.sessionId, fileType: data.attachment.type.split('/')[0], content: 'board' }));
      formData.append('file', data.attachment);
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
        const info = {
          userId: account.user.id,
          timeStamp: Date.now(),
          name: data.name,
          boardColumnCardId: task.id,
          url: res.data,
        };
        const apiRes = await apis.addBoardColumnCardAttachment({ ...info, broadCastId: `Board-${boardId}` });
        addDatabaseSchema('BoardColumnCardAttachment', { ...info, id: apiRes });
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
};

export default Attachment;
