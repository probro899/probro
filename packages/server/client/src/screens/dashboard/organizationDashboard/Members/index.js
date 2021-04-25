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
    const { database, orgObj } = this.props;
    return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id);
  }

  render() {
    const members = this.getMembers();
    console.log('Props in members tab', this.props);
    return (
          <>
            <Header
              header="Members List"
              totalUser={members.length}
              popupContent={<AddNewMembers {...this.props}/>}
              buttonText="Add Members"
              popupTitle="Add new members"
              addButton
            />
            <Filter />
            <MembersList users={members} />
          </>
    );
  }
}

export default Members;
