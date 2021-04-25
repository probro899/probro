import React from 'react';
import Header from '../components/Header';
import UserList from './UserList';
import AddNewUser from './AddNewUser';

class Roles extends React.Component {
    
    componentDidMount() {
        this.props.setActiveHeader('roles');
    }

    getRoles = () => {
        const { database, orgObj } = this.props;
        return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id);
    }

    render() {
        const roles = this.getRoles();
        console.log('apis==>', this.props.apis);
        return (
            <>
                <Header
                    header="User List"
                    totalUser={roles.length}
                    popupContent={<AddNewUser />}
                    buttonText="Add Role"
                    popupTitle="Invite new user"
                    addButton={true}
                />
                <UserList users={roles} />
            </>
        )
    }
}

export default Roles;
