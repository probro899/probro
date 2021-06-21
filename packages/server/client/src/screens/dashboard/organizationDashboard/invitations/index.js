import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import Filter from '../components/Filter';
import InvitationList from './InvitationList';

class Invitations extends React.Component {
  componentDidMount() {
    const { setActiveHeader } = this.props;
    setActiveHeader('invitations');
  }

  getRequests = () => {
    const { database, orgObj } = this.props;
    return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id).filter(o => o.status === 'invitation');
  }

  render() {
    const requests = this.getRequests();
    return (
      <div className="pc-table-wrapper">
        <Header
          header="Pending Invitations"
          totalUser={requests.length}
        />
        {/* <Filter select={true} date={false} /> */}
        <InvitationList requests={requests} props={this.props} />
      </div>
    );
  }
}
export default Invitations;
Invitations.propTypes = {
  setActiveHeader: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
