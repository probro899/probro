import React from 'react'
import { CreateOrganization } from './CreateOrganization';
import OrganizationList from './OrganizationList';

export default (props) => {
  return (
    <>
      <CreateOrganization {...props} />
      <OrganizationList {...props} />
    </>
  );
};
