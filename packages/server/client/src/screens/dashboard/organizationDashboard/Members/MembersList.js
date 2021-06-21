import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { CgStack } from 'react-icons/cg';
import React, { useState, useEffect, useRef } from 'react';
import Table from '../../../../common/Table/index';
import DeletePopOver from '../../../../common/DeletePopOver';

const MembersList = ({ users, props }) => {
  const previousRef = useRef();
  const [actionIds, setIds] = useState([]);
  const [loading, changeLoding] = useState(false);
  const [memDeletePopOver, toggleDeletePopover] = useState(false);

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

  const sortNames = () => {
    console.log('sort');
  };

  const toggleDeletePopoverHandler = () => {
    toggleDeletePopover(!memDeletePopOver);
  };

  const deleteHandler = async (e) => {
    const { apis, orgObj, updateNav, deleteDatabaseSchema, updateDatabaseSchema } = props;
    try {
      changeLoding(true);
      const res = await apis.deleteOrganizationMember({ ids: actionIds, oId: orgObj.id });
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

  const deleteActionHandler = (type) => {
    if (type === 'confirm') {
      deleteHandler();
    } else {
      toggleDeletePopoverHandler();
    }
  };

  // console.log('state value in members', props);
  return (
    <>
      <Table
        headers={{ icon: <CgStack size={20} />, name: 'Name', email: 'Email', type: 'Type', timeStamp: 'Join Date' }}
        data={users.map((user) => ({
          ...user,
          name: user.user.user.firstName,
          checked: false,
          timeStamp: <Moment format="YYYY-MM-DD">{user.timeStamp}</Moment>,
          icon: <input checked={user.checked} type="checkbox" id={user.id} name={user.name} value={user.id} onChange={() => toggleCheck(user)} />,
        }))}
        actions={[
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
        action={(type) => deleteActionHandler(type)}
        name="Member"
      />
    </>
  );
};

export default MembersList;
MembersList.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};
