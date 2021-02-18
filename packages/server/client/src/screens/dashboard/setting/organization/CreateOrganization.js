import React from 'react'
import { Form } from '../../../../common/';
import Popup from '../../../../common/Form/Popup';
import { uploadFile } from '../../../../common/utility-functions';
import OrganizationScheme from './structure';
import { Button } from '../../../../common/utility-functions/Button/Button';


export class CreateOrganization extends React.Component {
    state = {
        isOpen: false,

    }

    togglePopover = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    saveOrganization = async (data) => {
        const { apis, account } = this.props;
        let imgUrl = null;
        var orgData = data;
        try {
            if (data.image instanceof File) {
                const res = await uploadFile('organization', orgData.image, account.sessionId);
                if (res.status === 200) {
                    imgUrl = res.data
                } else {
                    return { response: 400, error: res.data };
                };
            }
            delete orgData.headline;
            delete orgData.websiteUrl;
            orgData.image = imgUrl;
            const res = await apis.addOrganization(
                { ...orgData, uId: account.user.id },
            );
            // console.log("hello", res);
            return { response: 200, message: 'Changed successfully' };
        } catch (e) {
            // console.log("whats error", e);
            return { response: 400, error: 'Internal server error' };
        }
    }

    render() {
        const { isOpen } = this.state;
        return (
            <>
                <div className="pc-organization-section">
                    <div className="pc-organizarion-header">
                        <h3>Organization</h3>
                        <div className="pc-create-org">
                            <div className="pc-create-org-btn">
                                <Button
                                    onClick={this.togglePopover}
                                    type="button"
                                    buttonStyle="btn--primary--solid"
                                    buttonSize="btn--small"
                                    title="Create Organization"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Popup isOpen={isOpen} onClose={this.togglePopover}>
                    <Form data={OrganizationScheme} callback={this.saveOrganization} />
                </Popup>
            </>
        )
    }
}
