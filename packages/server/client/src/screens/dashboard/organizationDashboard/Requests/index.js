import React from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import RequestList from './RequestList';

class Requests extends React.Component {
    
    componentDidMount() {
        this.props.setActiveHeader('requests');
    }

    getRequests = () => {
        const { database, orgObj } = this.props;
        return Object.values(database.OrganizationMember.byId).filter(o => o.oId === orgObj.id);
    }

    render() {
        const requests = this.getRequests();
        return (
            <>
                <Header
                    header="Pending Requests"
                    totalUser={requests.length}
                />
                <Filter select={true} date={false} />
                <RequestList requests={requests} />
            </>
        )

    }
}

export default Requests;
