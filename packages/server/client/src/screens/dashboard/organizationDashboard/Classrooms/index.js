import React from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import ClassList from './ClassList';
import ClassRequest from './ClassRequest';

class Classrooms extends React.Component {
    
    componentDidMount() {
        this.props.setActiveHeader('classrooms');
    }

    getClasses = () => {
        const { database, orgObj } = this.props;
        return Object.values(database.Board.byId).filter(o => o.oId === orgObj.id);
    }

    getRequests = () => {
        const { database, orgObj } = this.props;
        return Object.values(database.Board.byId).filter(o => o.oId === orgObj.id);
    }

    render() {
        const requests = this.getRequests();
        const classes = this.getClasses();
        return (
            <>
                <Header
                    header="Class List"
                    totalUser={classes.length}
                    buttonText="Requests"
                    popupContent={<ClassRequest requests={requests} />}
                    popupTitle="Pending Requests"
                    addButton={true}
                    badge={true}
                    badgeCount={requests.length}
                />
                <Filter />
                <ClassList classes={classes} />
            </>
        )
    }
}

export default Classrooms;
