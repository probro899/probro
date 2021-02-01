import React from 'react'
import { Form } from '../../../../common/';
import Popup from '../../../../common/Form/Popup';
import { OrganizationScheme } from './structure';
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
        const { apis } = this.props;
        try {
            const res = await apis.addOrganization(data);
            // console.log('res', res)
            return { response: 200, message: 'Changed successfully' };
        } catch (e) {
            // console.log("whats error", e);
            return { response: 400, error: 'Internal server error' };
        }
    }

    render() {
        console.log("apis", this.props.apis);
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
