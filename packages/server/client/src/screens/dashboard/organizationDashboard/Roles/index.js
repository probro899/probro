import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import UserList from './UserList';
import AddNewUser from './AddNewUser';

class Roles extends React.Component {
  componentDidMount() {
    this.props.setActiveHeader('roles');
  }

  getRoles = () => {
    const { database, orgObj } = this.props;
    return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id).filter(m => m.status === 'active' && m.type !== 'student' && m.uId !== orgObj.uId);
  }

  render() {
    const roles = this.getRoles();
    // console.log('apis==>', this.props);
    return (
      <div className="pc-table-wrapper">
        <Header
          header="User List"
          totalUser={roles.length}
          popupContent={<AddNewUser {...this.props} />}
          buttonText="Add Role"
          popupTitle="Invite new user"
          addButton
        />
        <UserList users={roles} props={this.props} />
      </div>
    );
  }
}

export default Roles;
Roles.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
