import React from 'react'
import { CreateOrganization } from './CreateOrganization';
import { OrganizationList } from './OrganizationList';

export default ({ apis }) => {
    return (
        <>
            <CreateOrganization apis={apis} />
            <OrganizationList />
        </>
    )
}


