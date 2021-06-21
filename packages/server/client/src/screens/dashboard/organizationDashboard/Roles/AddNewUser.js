import PropTypes from 'prop-types';
import React from 'react';
import { Form } from '../../../../common';
import RoleSchema from './structure';
import addMember from '../helperFunctions/addMember';

const AddNewUser = (props) => {
  const addRole = async (data) => {
    const { orgObj } = props;
    const record = { ...data, oId: orgObj.id, action: 'invitation' };
    const res = await addMember(record, props);
    return res;
  };

  return (
    <div className="pc-add-new-user">
      <Form data={RoleSchema} callback={addRole} />
    </div>
  );
};

export default AddNewUser;
AddNewUser.propTypes = {
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
