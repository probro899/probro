import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadFile } from '../../../../common/utility-functions';
import * as actions from '../../../../actions';
import OrganizationScheme from './structure';
import { MoreButton } from '../../../../components';
import { Form } from '../../../../common/';
import Popup from '../../../../common/Form/Popup';
import DeletePopver from '../../../../common/DeletePopOver';
import { ENDPOINT } from '../../../../config/index';
 
class OrganizationList extends Component {
    state = { scheme: OrganizationScheme, editId: null, deleteOrg: false, deleteObj: {} };
    
    toggleDelete = (obj={}) => {
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

    toggleEdit = (objId=null) => {
      this.setState({ editId: objId });
    }

    initEdit = (editId) => {
        const { database } = this.props;
        const obj = Object.values(database.Organization.byId).find(o => o.id === editId);
        const scheme = OrganizationScheme.map(o => {
            return { ...o, val: obj[o.id] };
        })
        this.setState({ scheme });
    }

    onMore = (type, id) => {
        const { database } = this.props;    
        if (type === 'edit') {
            this.initEdit(id);
            this.toggleEdit(id);
        }
        if (type === 'delete') {
            const obj = Object.values(database.Organization.byId).find(o => o.id === id);
            this.toggleDelete(obj);
        }
    }

    saveOrganization = async (data) => {
        const { editId } = this.state;
        const { apis, updateDatabaseSchema, account } = this.props;
        let imgUrl = null;
        
        try {
            if (data.image instanceof File) {
                const res  = await uploadFile('organization', data.image, account.sessionId);
                if (res.status === 200) {
                    imgUrl = res.data
                } else {
                    return { response: 400, error: res.data };
                };
            } else {
                imgUrl = data.image.name;
            }
            const res =  await apis.updateOrganization([{ 
                ...data, image: imgUrl,
            }, {id: editId }]);

            if (res) {
                updateDatabaseSchema('Organization', { id: editId, ...data, image: imgUrl });
            }
            return { response: 200, message: 'Changed successfully' };
        } catch (e) {
            return { response: 400, error: 'Internal server error' };
        }
    }
    
    render() {
        const { match, database, account } = this.props;
        const dataList = Object.values(database.Organization.byId);
        const { editId, deleteOrg, scheme, deleteObj } = this.state;
        return (
            <div className="pc-organization-list">
                {
                    dataList.length ?
                    dataList.map(data => <div className="pc-org-list-container">
                            <div className="pc-each-org-wrapper">
                                <div className="pc-org-img-container">
                                    <MoreButton onMore={this.onMore} id={data.id} />
                                    <figure>
                                        <img
                                            alt={data.name}
                                            src={data.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(account.user.id, 10)}/organization/${data.image}` : '/assets/graphics/organization.svg'}
                                        />
                                    </figure>
                                </div>
                                <div className="pc-org-detail-container">
                                    <div className="pc-org-name">
                                        <Link to={`/dashboard/${match.params.id}/organization/${data.id}/home`}>
                                            {data.name}
                                        </Link>
                                    </div>
                                    <div className="pc-org-address">
                                        <p>{data.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>) : <p className="no-organization-title">You don't have any organization. Create One?</p>
                }
                <Popup title="Add Organization" isOpen={editId ? true : false} onClose={this.toggleEdit}>
                    <Form data={scheme} callback={this.saveOrganization} />
                </Popup>
                <DeletePopver name={deleteObj.name} isOpen={deleteOrg} action={this.deletePopoverAction} />
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(OrganizationList);
