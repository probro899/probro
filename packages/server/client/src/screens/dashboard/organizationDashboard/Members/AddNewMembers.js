import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../../common';
import MemberSchema from './structure';
import addMemberHelper from '../helperFunctions/addMember';

const AddNewMembers = (props) => {
  const addMember = async (data) => {
    const { orgObj } = props;
    const record = { ...data, oId: orgObj.id, type: 'student', action: 'invitation' };
    const res = await addMemberHelper(record, props);
    return res;
  };

  return (
    <div className="pc-add-new-user">
      <Form data={MemberSchema} callback={addMember} />
    </div>
  );
};

export default AddNewMembers;
AddNewMembers.propTypes = {
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
