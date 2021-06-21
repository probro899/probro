import React, { useState } from 'react';
import { AiFillSave } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { connect } from 'react-redux';
import { FormSelectField } from '../../../../../common/Form/FormSelectField';
import { Button } from '../../../../../common/utility-functions/Button/Button';

const SelectProject = ({ Board, course, onSuccess, onCancel }) => {
  const [projId, setProject] = useState(null);
  const boards = Object.values(Board.byId).filter((o) => o.cId && o.cId === course.courseId && !o.ceId);
  const opt = boards.map((o) => ({ label: o.name, value: o.id }));
  return (
    <div className="select-project">
      <FormSelectField onChange={(e) => setProject(e.target.value)} options={[{ label: '---', value: null }, ...opt]} value={projId} label="Select Project" />
      <div className="video-buttons">
        <Button type="button" onClick={() => onSuccess(projId)} buttonStyle="btn--success--solid" buttonSize="btn--small" icon={<AiFillSave size={20} />} />
        <Button type="button" onClick={onCancel} buttonStyle="btn--danger--outline" buttonSize="btn--small" icon={<GiCancel size={20} />} />
      </div>
    </div>
  );
};

const mapsStateToProps = ({ database, course }) => ({ Board: database.Board, course });
export default connect(mapsStateToProps)(SelectProject);
