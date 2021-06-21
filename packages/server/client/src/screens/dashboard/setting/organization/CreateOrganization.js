/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Form } from '../../../../common/';
import Popup from '../../../../common/Form/Popup';
import { uploadFile } from '../../../../common/utility-functions';
import OrganizationScheme from './structure';
import { Button } from '../../../../common/utility-functions/Button/Button';

export class CreateOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

    togglePopover = () => {
      const { isOpen } = this.state;
      this.setState({ isOpen: !isOpen });
    }

    saveOrganization = async (data) => {
      const { apis, account, addDatabaseSchema } = this.props;
      let imgUrl = null;

      try {
        if (data.image instanceof File) {
          const res = await uploadFile('organization', data.image, account.sessionId);
          if (res.status === 200) {
            imgUrl = res.data;
          } else {
            return { response: 400, error: res.data };
          }
        }
        const res = await apis.addOrganization(
          { ...data, image: imgUrl, uId: account.user.id },
        );
        if (res.status === 200) {
          addDatabaseSchema('Organization', {...data, image: imgUrl, uId: account.user.id, id: res.id, slug: res.slug });
          return { response: 200, message: 'Created successfully' };
        }
        return { response: 400, message: 'Internal server error' };
      } catch (e) {
        return { response: 400, error: 'Internal server error' };
      }
    }

    render() {
      const { isOpen } = this.state;
      return (
        <>
          <div className="pc-organization-section">
            <div className="pc-organizarion-header">
              <h3>Organizations</h3>
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
          <Popup title="Add Organization" isOpen={isOpen} onClose={this.togglePopover}>
            <Form data={OrganizationScheme} callback={this.saveOrganization} />
          </Popup>
        </>
      );
    }
}
