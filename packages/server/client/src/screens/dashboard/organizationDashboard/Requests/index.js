import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Filter from '../components/Filter';
import RequestList from './RequestList';

class Requests extends React.Component {
  componentDidMount() {
    this.props.setActiveHeader('requests');
  }

  getRequests = () => {
    const { database, orgObj } = this.props;
    return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id).filter(m => m.status === 'request');
  }

  render() {
    const requests = this.getRequests();
    return (
      <div className="pc-table-wrapper">
        <Header
          header="Pending Requests"
          totalUser={requests.length}
        />
        {/* <Filter select={true} date={false} /> */}
        <RequestList requests={requests} props={this.props} />
      </div>
    );
  }
}

export default Requests;
Requests.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
// invitation
// request
// active
// inactive
