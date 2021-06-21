import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { SwitchButton } from '../../../../common/Form/SwitchButton';

const ChangeRole = ({ currentRoleId, props }) => {
  // console.log('props in chagneRole', props, currentRoleId);
  const [active, setActive] = useState(false);
  const [type, changeType] = useState(currentRoleId ? currentRoleId.type : 'admin');
  const [loading, changeLoding] = useState(false);
  const [success, changeSuccess] = useState('');
  const [error, changeError] = useState('');
  const options = [
    {
      label: 'admin',
      value: 'admin',
    },
    {
      label: 'manager',
      value: 'manager',
    },
    {
      label: 'mentor',
      value: 'mentor',
    },
  ];

  const changeActiveStatus = () => {
    setActive(!active);
  };

  const submitHandler = async () => {
    try {
      const { apis, updateDatabaseSchema } = props;
      changeLoding(true);
      const res = await apis.updateOrganizationMember([{ type }, { id: currentRoleId.id }]);
      changeLoding(false);
      if (res.id) {
        changeSuccess('Record updated successfully');
        updateDatabaseSchema('OrganizationMember', { id: res.id, type });
      }
    } catch (e) {
      changeLoding(false);
      changeSuccess('');
      changeError('Record Update Faild');
      console.error('Error in Change Role handler', e);
    }
  };

  const changeRoleHandler = (e) => {
    if (e.target.value) {
      changeType(e.target.value);
    }
  };

  return (
    <>
      <FormSelectField
        options={options}
        name="Role"
        onChange={changeRoleHandler}
        value={type}
      />
      <div className="pc-change-active">
        <span>Status - <strong>{active ? 'active' : 'inactive'}</strong> </span>
        <SwitchButton
          onChange={changeActiveStatus}
          checked={active}
        />
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <span style={{ color: 'green' }}>{success}</span>
        <span style={{ color: 'red' }}>{error}</span>
      </div>
      <Button
        onClick={submitHandler}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
        title="Submit"
        loading={loading}
      />
    </>
  );
};

export default ChangeRole;
ChangeRole.propTypes = {
  currentRoleId: PropTypes.objectOf(PropTypes.any).isRequired,
  props: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};
