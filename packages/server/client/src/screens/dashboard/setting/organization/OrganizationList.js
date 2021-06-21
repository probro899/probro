import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadFile } from '../../../../common/utility-functions';
import * as actions from '../../../../actions';
import OrganizationScheme from './structure';
import { MoreButton } from '../../../../components';
import { Form, Spinner } from '../../../../common';
import Popup from '../../../../common/Form/Popup';
import DeletePopver from '../../../../common/DeletePopOver';
import { ENDPOINT } from '../../../../config/index';

class OrganizationList extends Component {
  constructor(props) {
    super(props);
    this.state = { scheme: OrganizationScheme, editId: null, deleteOrg: false, deleteObj: {}, fetchingData: true };
  }

  async componentDidMount() {
    const { apis, Organization } = this.props;
    const hasOrganization = Object.values(Organization.byId).length === 0;
    if (apis.getOrganizations && hasOrganization) {
      const res = await apis.getOrganizations();
      if (res.status === 200) {
        this.setState({ fetchingData: false });
      }
    }
  }

  async componentDidUpdate() {
    const { Organization, apis } = this.props;
    const { fetchingData } = this.state;
    const hasOrganization = Object.values(Organization.byId).length === 0;
    if (fetchingData && apis.getOrganizations && hasOrganization) {
      const res = await apis.getOrganizations();
      if (res.status === 200) {
        this.setState({ fetchingData: false });
      }
    }
  }

  toggleDelete = (obj = {}) => {
    const { deleteOrg } = this.state;
    this.setState({ deleteOrg: !deleteOrg, deleteObj: obj });
  }

  deletePopoverAction = async (type) => {
    const { apis, deleteDatabaseSchema } = this.props;
    const { deleteObj } = this.state;
    if (type === 'confirm') {
      await apis.deleteOrganization({ id: deleteObj.id });
      deleteDatabaseSchema('Organization', { id: deleteObj.id });
    }
    this.toggleDelete();
  }

  toggleEdit = (objId = null) => {
    this.setState({ editId: objId });
  }

  initEdit = (editId) => {
    const { Organization } = this.props;
    const obj = Object.values(Organization.byId).find((o) => o.id === editId);
    const scheme = OrganizationScheme.map((o) => ({ ...o, val: obj[o.id] }));
    this.setState({ scheme });
  }

  onMore = (type, id) => {
    const { Organization } = this.props;
    if (type === 'edit') {
      this.initEdit(id);
      this.toggleEdit(id);
    }
    if (type === 'delete') {
      const obj = Object.values(Organization.byId).find(o => o.id === id);
      this.toggleDelete(obj);
    }
  }

  saveOrganization = async (data) => {
    const { editId } = this.state;
    const { apis, updateDatabaseSchema, account } = this.props;
    let imgUrl = null;

    try {
      if (data.image instanceof File) {
        const res = await uploadFile('organization', data.image, account.sessionId);
        if (res.status === 200) {
          imgUrl = res.data;
        } else {
          return { response: 400, error: res.data };
        }
      } else {
        imgUrl = data.image.name;
      }
      const res = await apis.updateOrganization([{
        ...data, image: imgUrl,
      }, { id: editId }]);

      if (res) {
        updateDatabaseSchema('Organization', { id: editId, ...data, image: imgUrl });
      }
      return { response: 200, message: 'Changed successfully' };
    } catch (e) {
      return { response: 400, error: 'Internal server error' };
    }
  }

  render() {
    const { match, Organization } = this.props;
    const dataList = Object.values(Organization.byId);
    const { editId, deleteOrg, scheme, deleteObj, fetchingData } = this.state;
    if (fetchingData) return <Spinner />;
    return (
      <div className="pc-organization-list">
        {
            dataList.length ?
              dataList.map((data) => (
                <div className="pc-org-list-container">
                  <div className="pc-each-org-wrapper">
                    <div className="cover-gradient" />
                    <div className="pc-org-img-container">
                      <figure className="organization-display-image">
                        <img
                          alt={data.name}
                          src={data.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(data.uId, 10)}/organization/${data.image}` : '/assets/graphics/organization.svg'}
                        />
                      </figure>
                      {data.role === 'admin' && <MoreButton onMore={this.onMore} id={data.id} />}
                    </div>
                    <div className="pc-org-detail-container">
                      <div className="pc-org-name">
                        <Link to={`/organization/${data.slug}`}>{data.name}</Link>
                      </div>
                      <div className="pc-org-address">
                        <p>{data.location}</p>
                      </div>
                    </div>
                    <div className="organizarion-basic-stats">
                      <div className="data-wrap notification">
                        <p className="title">{data.email}</p>
                      </div>
                      <div className="data-wrap visitor">
                        <p className="title">{data.phoneNo}</p>
                      </div>
                    </div>
                    <div className="view-stat-link">
                      {data.role !== 'student' && data.role !== 'mentor' && (<Link to={`/dashboard/${match.params.id}/organization/${data.id}/home`}>See analytics</Link>)}
                    </div>
                  </div>
                </div>
              )) : <p className="no-organization-title">You don't have any organization. Create One?</p>
      }
        <Popup title="Add Organization" isOpen={editId} onClose={this.toggleEdit}>
          <Form data={scheme} callback={this.saveOrganization} />
        </Popup>
        <DeletePopver name={deleteObj.name} isOpen={deleteOrg} action={this.deletePopoverAction} />
      </div>
    );
  }
}

OrganizationList.propTypes = {
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ database, account }) => ({ Organization: database.Organization, account });
export default connect(mapStateToProps, { ...actions })(OrganizationList);
