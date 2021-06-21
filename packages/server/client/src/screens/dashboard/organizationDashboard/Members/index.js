import React from 'react';
import Header from '../components/Header';
import AddNewMembers from './AddNewMembers';
import MembersList from './MembersList';
import Filter from '../components/Filter';

class Members extends React.Component {
  componentDidMount() {
    this.props.setActiveHeader('members');
  }

  getMembers = () => {
    const { orgObj, database } = this.props;
    return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id).filter(m => m.status === 'active' && m.type === 'student');
  }

  render() {
    const members = this.getMembers();
    return (
      <div className="pc-table-wrapper">
        <Header
          header="Members List"
          totalUser={members.length}
          popupContent={<AddNewMembers {...this.props} />}
          buttonText="Add Members"
          popupTitle="Add new members"
          addButton
        />
        <Filter />
        <MembersList users={members} props={this.props} />
      </div>
    );
  }
}

export default Members;
