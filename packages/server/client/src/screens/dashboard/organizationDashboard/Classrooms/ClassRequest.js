import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { CgStack } from 'react-icons/cg';
import Table from '../../../../common/Table/index';
import DeletePopOver from '../../../../common/DeletePopOver';

const ClassRequest = ({ requests, props }) => {
  const { orgObj } = props;
  const { subscribedPackage } = orgObj;
  const [actionIds, setIds] = useState([]);
  const [loading, changeLoding] = useState(false);
  const [memDeletePopOver, toggleDeletePopover] = useState(false);
  const [refCode, changeRefCode] = useState(subscribedPackage && subscribedPackage.referenceCode);

  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = actionIds;
  });

  const toggleDeletePopoverHandler = () => {
    toggleDeletePopover(!memDeletePopOver);
  };

  const toggleCheck = (user) => {
    // console.log('toggle check', user);
    const { updateDatabaseSchema } = props;
    updateDatabaseSchema('Organization', { id: orgObj.id, classes: orgObj.classes.map((c) => (c.id === user.id ? { ...c, checked: !c.checked } : c)) });
    const hasId = previousRef.current.find((i) => i === user.id);
    if (hasId) {
      setIds(previousRef.current.filter((i) => i !== user.id));
    } else {
      setIds([...previousRef.current, user.id]);
    }
  };

  const acceptHandler = async () => {
    const { apis, updateNav, updateDatabaseSchema } = props;
    try {
      changeLoding(true);
      const res = await apis.updateBoard({ ids: actionIds, refCode, action: 'orgAcceptBoard', orgId: orgObj.id });
      changeLoding(false);
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Record updated successfully', intent: 'success' } });
        const newClasses = orgObj.classes.map((c) => (actionIds.find((id) => c.id === id) ? { ...c, refCode, checked: false } : c));
        updateDatabaseSchema('Organization', { id: orgObj.id, classes: newClasses });
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
    const { apis, updateNav, updateDatabaseSchema } = props;
    try {
      const res = await apis.deleteBoard({ ids: actionIds, action: 'orgDelete', orgId: orgObj.id });
      toggleDeletePopoverHandler();
      if (res.status === 200) {
        updateNav({ schema: 'popNotification', data: { active: true, message: 'Record deleted successfully', intent: 'success' } });
        const newClasses = orgObj.classes.filter((c) => !actionIds.find((id) => c.id === id));
        updateDatabaseSchema('Organization', { id: orgObj.id, classes: newClasses });
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
    <div className="pc-table-wrapper">
      <div style={{ margin: 10 }}>
        <h3>Select Package</h3>
        {subscribedPackage && <input checked={refCode} type="checkbox" id={subscribedPackage.referenceCode} name="refcode" value={refCode} onChange={() => changeRefCode(subscribedPackage.referenceCode)} />}
        { subscribedPackage && <span style={{ marginLeft: 10 }}>{subscribedPackage.packageDetail.descrition}</span>}
      </div>
      <Table
        headers={{ icon: <CgStack size={20} />, name: 'Name', noOfMembers: 'Members', timeStamp: 'Started Date' }}
        data={requests.map((c) => ({
          ...c,
          checked: false,
          timeStamp: <Moment format="YYYY-MM-DD">{c.timeStamp}</Moment>,
          icon: <input checked={c.checked} type="checkbox" id={c.id} name={c.name} value={c.id} onChange={() => toggleCheck(c)} />,
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
    </div>
  );
};

export default ClassRequest;

ClassRequest.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  // database: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired, 
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired, 
  updateNav: PropTypes.func.isRequired, 
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

