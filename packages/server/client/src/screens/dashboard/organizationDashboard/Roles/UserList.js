/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { CgStack } from 'react-icons/cg';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { BsPerson } from 'react-icons/bs';
import Popup from '../../../../common/Form/Popup';
import ChangeRole from './ChangeRole';
import { Tooltip } from '../../../../common/Form/Tooltip';
import { sort } from '../helperFunctions/sort';
import Table from '../../../../common/Table/index';
import DeletePopOver from '../../../../common/DeletePopOver';
 
const UserList = ({ users, props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoleId, changeRoleId] = useState(null);
  const [asc, setAsc] = useState(true);

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


  // useEffect(() => {
  //   sort(users, asc);
  // }, [asc]);

  const togglePopup = (id) => {
    changeRoleId(id);
    setIsOpen(!isOpen);
  };

  const sortNames = () => {
    setAsc(!asc);
  };

  // console.log('props in userlist', props, users);
  const userName = currentRoleId ? currentRoleId.user.user.firstName : '';
  return (
    <div className="pc-user-list">
      <Table
        headers={{
          icon: <CgStack size={20} />,
          name: <>
            Name
            {asc ? <GoChevronDown size="20" onClick={sortNames} /> : <GoChevronUp size="20" onClick={sortNames} />}
          </>,
          email: 'Email',
          type: 'Role',
          status: 'Status',
        }}
        data={users.map((user) => ({
          ...user,
          name: user.user.user.firstName,
          type: <Tooltip content="Change role"><span onClick={() => togglePopup(user)} className="pc-click-name">{user.type}</span></Tooltip>,
          status: <Tooltip content={`${user.status === 'active' ? 'active' : 'inactive'}`}>
                  <span className={`${user.status === 'active' ? 'active' : 'inactive'} pc-status`} />
                  </Tooltip>,
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
      <Popup isOpen={isOpen} onClose={togglePopup} title={`Change Role of ${userName}`} icon={<BsPerson size={20} />}>
        <ChangeRole currentRoleId={currentRoleId} props={props} />
      </Popup>
      <DeletePopOver
        isOpen={memDeletePopOver}
        action={(type) => deleteActionHandler(type)}
        name="Member"
      />
    </div>
  );
};

export default UserList;
UserList.propTypes = {
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
};
