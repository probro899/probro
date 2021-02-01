import React from 'react'
import { MdMyLocation } from 'react-icons/md';
const OrganizationDashboard = () => {
    return (
        <div className="pc-organization-dashboard">
            <div className="pc-org-dashboard-wrapper">
                <div className="pc-org-header">
                    <figure className="pc-org-profile-img">
                        <img src="http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg" alt="org profile" />
                    </figure>
                    <h2 className="pc-org-name">Test Organization</h2>
                    <div className="pc-org-location">
                        <MdMyLocation />
                        {' '}
                        <span style={{ fontSize: 12, marginLeft: 2 }}>
                            {' '}
                            Kathmandu, Nepal
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationDashboard;