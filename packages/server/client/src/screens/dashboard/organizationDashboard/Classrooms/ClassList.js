import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { AiOutlineBarChart, AiOutlineClose } from 'react-icons/ai';
import { CgStack } from 'react-icons/cg';
import { FaUsers } from 'react-icons/fa';
import DeletePopOver from '../../../../common/DeletePopOver';
import { Tooltip } from '../../../../common/Form/Tooltip';
import Table from '../../../../common/Table/index';
import Report from '../../../class/report';
import MemberList from './MemberList';

const ClassList = ({ classes, props }) => {
  const [showReport, toggleReport] = useState(false);
  const [actionIds, setIds] = useState([]);
  const [memDeletePopOver, toggleDeletePopover] = useState(false);
  const [cId, changeClassId] = useState(null);
  const [showMemberList, toggleMemberList] = useState(false);
  const { database } = props;

  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = actionIds;
  });


  const showReportHandler = (classId) => {
    changeClassId(classId);
    toggleReport(!showReport);
  };

  const toggleMemberListHandler = (classId) => {
    changeClassId(classId);
    toggleMemberList(!showMemberList);
  };

  const toggleDeletePopoverHandler = () => {
    toggleDeletePopover(!memDeletePopOver);
  };

  const toggleCheck = (user) => {
    const { updateDatabaseSchema } = props;
    updateDatabaseSchema('Board', { id: user.id, checked: !user.checked });
    const hasId = previousRef.current.find((i) => i === user.id);
    if (hasId) {
      setIds(previousRef.current.filter((i) => i !== user.id));
    } else {
      setIds([...previousRef.current, user.id]);
    }
  };

  const deleteHandler = async (e) => {
    const { apis, orgObj, updateNav, deleteDatabaseSchema, updateDatabaseSchema } = props;
    try {
      const res = await apis.deleteBoard({ ids: actionIds, action: 'orgDelete', orgId: orgObj.id });
      toggleDeletePopoverHandler();
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Record deleted successfully', intent: 'success' } });
        actionIds.forEach((id) => deleteDatabaseSchema('Board', { id }));
        actionIds.forEach((id) => updateDatabaseSchema('Board', { id, checked: false }));
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

  return (
    <>
      <Table
        headers={{ icon: <CgStack size={20} />, name: 'Name', noOfMembers: 'Members', timeStamp: 'Started Date', report: 'Report' }}
        data={classes.map((c) => ({
          ...c,
          timeStamp: <Moment format="YYYY-MM-DD">{c.timeStamp}</Moment>,
          noOfMembers: <Tooltip content="All Members">
            <div className="all-members"> <FaUsers size={20} style={{ cursor: 'pointer' }} onClick={() => toggleMemberListHandler(c.id)} />
              <span className="member-count">{c.noOfMembers}</span></div>
          </Tooltip>,
          checked: false,
          report: <Tooltip content="Report"><AiOutlineBarChart size={20} style={{ cursor: 'pointer' }} onClick={() => showReportHandler(c.id)} /></Tooltip>,
          icon: <input checked={c.checked} type="checkbox" id={c.id} name={c.name} value={c.id} onChange={() => toggleCheck(c)} />,
        }))}
        actions={[
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
      <Report board={classes.find((c) => c.id === cId) || {}} isOpen={showReport} boardId={cId} onClose={toggleReport} boardMembers={database.BoardMember} {...props} />
      <MemberList isOpen={showMemberList} onClose={toggleMemberListHandler} classId={cId} {...props} />
      <DeletePopOver
        isOpen={memDeletePopOver}
        action={(type) => deleteActionHandler(type)}
        name="Request"
      />
    </>
  );
};
export default ClassList;
ClassList.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
  updateNav: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};
