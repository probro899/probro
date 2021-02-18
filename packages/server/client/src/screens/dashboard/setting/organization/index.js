import React from 'react'
import { CreateOrganization } from './CreateOrganization';
import { OrganizationList } from './OrganizationList';

export default ({ apis, match, account }) => {
    return (
        <>
            <CreateOrganization apis={apis} account={account} />
            <OrganizationList match={match} />
        </>
    )
}


