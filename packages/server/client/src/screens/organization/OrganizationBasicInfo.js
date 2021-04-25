import React from 'react'
import { ProfilePicture } from './ProfilePicture';
import { ConnectButtons } from './ConnectButtons';
import { InfoDetails } from './InfoDetails';

export const OrganizationBasicInfo = () => {
    return (
        <div className="pc-info-wrapper">
            <div className="pc-profile-body">
                <ProfilePicture />
                <ConnectButtons />
            </div>
            <InfoDetails />
        </div>
    )
}
