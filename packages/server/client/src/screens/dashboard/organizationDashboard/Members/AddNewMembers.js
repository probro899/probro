import React from 'react';
import { Form } from '../../../../common';
import MemberSchema from './structure';

const AddNewMembers = (props) => {
  const addMember = (data) => {
    console.log('add member called', data, props);
    return { response: 200, message: "Member added successfully" };
  };

  return (
    <div className="pc-add-new-user">
      <Form data={MemberSchema} callback={addMember.bind(this)} />
    </div>
  );
};

export default AddNewMembers;
