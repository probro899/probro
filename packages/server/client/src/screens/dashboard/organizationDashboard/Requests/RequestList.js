import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { CgStack } from 'react-icons/cg';
import DeletePopOver from '../../../../common/DeletePopOver';
import Table from '../../../../common/Table/index';

const RequestList = ({ requests, props }) => {
  const [actionIds, setIds] = useState([]);
  const [loading, changeLoding] = useState(false);
  const [memDeletePopOver, toggleDeletePopover] = useState(false);
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = actionIds;
  });

  const toggleDeletePopoverHandler = () => {
    toggleDeletePopover(!memDeletePopOver);
  };

  // for checkbox
  const toggleCheck = (user) => {
    const { updateDatabaseSchema } = props;
    updateDatabaseSchema('OrganizationMember', { id: user.id, checked: !user.checked });
    const hasId = previousRef.current.find((i) => i === user.id);
    if (hasId) {
      setIds(previousRef.current.filter((i) => i !== user.id));
    } else {
      setIds([...previousRef.current, user.id]);
    }
  };

  const acceptHandler = async (event) => {
    const { apis, orgObj, updateNav, updateDatabaseSchema } = props;
    try {
      changeLoding(true);
      const res = await apis.updateOrganizationMember({ ids: actionIds, oId: orgObj.id, status: 'active' });
      changeLoding(false);
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Record updated successfully', intent: 'success' } });
        actionIds.forEach((id) => updateDatabaseSchema('OrganizationMember', { id, status: 'active', checked: false }));
      }
      if (res.status === 201) {
        updateNav({ schema: 'popNotification', data: { active: true, message: res.data, intent: 'error' } });
      }
    } catch (e) {
      changeLoding(false);
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Record deletion faild', intent: 'error' } });
      console.error('Error in Change Role handler', e);
    }
  };

  const deleteHandler = async (e) => {
    const { apis, orgObj, updateNav, deleteDatabaseSchema, updateDatabaseSchema } = props;
    try {
      const res = await apis.deleteOrganizationMember({ ids: actionIds, oId: orgObj.id });
      toggleDeletePopoverHandler();
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Record deleted successfully', intent: 'success' } });
        actionIds.forEach((id) => deleteDatabaseSchema('OrganizationMember', { id }));
        actionIds.forEach((id) => updateDatabaseSchema('OrganizationMember', { id, checked: false }));
      }
      if (res.status === 201) {
        updateNav({ schema: 'popNotification', data: { active: true, message: res.data, intent: 'error' } });
      }
    } catch (e) {
      toggleDeletePopoverHandler();
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Record deletion faild', intent: 'error' } });
      console.error('Error in Change Role handler', e);
    }
  };

  const deleteActionHandler = (type) => {
    if (type === 'confirm') {
      deleteHandler();
    } else {
      toggleDeletePopoverHandler();
    }
  };
 
  // console.log('actions data', props);
  return (
    <>
      <Table
        headers={{ icon: <CgStack size={20} />, name: 'Name', email: 'Email', type: 'Type', timeStamp: 'Request Date' }}
        data={requests.map((user) => ({
          ...user,
          name: user.user.user.firstName,
          checked: false,
          icon: <input checked={user.checked} type="checkbox" id={user.id} name={user.name} value={user.id} onChange={() => toggleCheck(user)} />,
        }))}
        actions={[
          {
            onClick: (e) => acceptHandler(e),
            buttonStyle: 'btn--primary--solid',
            icon: <AiOutlineCheck size={20} />,
            title: 'Accept',
            loading,
            disabled: actionIds.length === 0,
          },
          {
            onClick: (e) => toggleDeletePopoverHandler(),
            buttonStyle: 'btn--danger--solid',
            icon: <AiOutlineClose size={20} />,
            title: 'Delete',
            disabled: actionIds.length === 0,
          },
        ]}
        pagination={{
          page: 1,
          pageCount: 4,
        }}
      />
      <DeletePopOver
        isOpen={memDeletePopOver}
        action={(type) => deleteActionHandler(type)}
        name="Request"
      />
    </>
  );
};

export default RequestList;
RequestList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired, 
  updateDatabaseSchema: PropTypes.func.isRequired,
};

