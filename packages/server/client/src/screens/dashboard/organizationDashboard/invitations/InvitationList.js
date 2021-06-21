import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { CgStack } from 'react-icons/cg';
import Table from '../../../../common/Table/index';
import DeletePopOver from '../../../../common/DeletePopOver';
import addMember from '../helperFunctions/addMember';

const InvitationList = ({ requests, props }) => {
  const [actionIds, setIds] = useState([]);
  const [loading, changeLoding] = useState(false);
  const [memDeletePopOver, toggleDeletePopover] = useState(false);

  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = actionIds;
  });

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

  const resendHandler = async (event) => {
    console.log('Resend Hevent Called', event);
    const { updateNav } = props;
    changeLoding(true);
    const resendRes = await addMember({ action: 'resendInvitation', ids: actionIds }, props);
    changeLoding(false);
    if (resendRes.response === 200) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Invitation resend successfully', intent: 'success' } });
    }
    if (resendRes.response === 400) {
      updateNav({ schema: 'popNotification', data: { active: true, message: 'Invitation resend faild', intent: 'error' } });
    }
  };

  const toggleDeletePopoverHandler = () => {
    toggleDeletePopover(!memDeletePopOver);
  };

  const deleteHandler = async () => {
    // console.log('delete handler called');
    const { apis, orgObj, updateNav, deleteDatabaseSchema, updateDatabaseSchema } = props;
    try {
      changeLoding(true);
      const res = await apis.deleteOrganizationMember({ ids: actionIds, oId: orgObj.id, action: 'delete' });
      changeLoding(false);
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

  const delteActionHandler = (type) => {
    if (type === 'confirm') {
      deleteHandler();
    }
    if (type === 'cancle') {
      toggleDeletePopoverHandler();
    }
  };

  console.log('actions data', actionIds);
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
            onClick: (e) => resendHandler(e),
            buttonStyle: 'btn--primary--solid',
            icon: <AiOutlineCheck size={20} />,
            title: 'Resend',
            disabled: actionIds.length === 0,
          },
          {
            onClick: (e) => toggleDeletePopoverHandler(),
            buttonStyle: 'btn--danger--solid',
            icon: <AiOutlineClose size={20} />,
            title: 'Delete',
            disabled: actionIds.length === 0,
            loading,
          },
        ]}
        pagination={{
          page: 1,
          pageCount: 4,
        }}
      />
      <DeletePopOver
        isOpen={memDeletePopOver}
        action={(type) => delteActionHandler(type)}
        name="Invitation"
      />
    </>
  );
};

export default InvitationList;
InvitationList.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  requests: PropTypes.arrayOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};
