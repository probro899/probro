import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Filter from '../components/Filter';
import ClassList from './ClassList';
import ClassRequest from './ClassRequest';

class Classrooms extends React.Component {
  componentDidMount() {
    const { setActiveHeader } = this.props;
    setActiveHeader('classrooms');
  }

  getClasses = () => {
    const { database, orgObj } = this.props;
    return orgObj.classes.map(c => {
      return {
        ...c,
        noOfMembers: Object.values(database.BoardMember.byId).filter(bm => bm.boardId === c.id).length,
      };
    }).filter(c => c.refCode);
  }

  getRequests = () => {
    const { database, orgObj } = this.props;
    return orgObj.classes.filter(o => o.oId === orgObj.id).map(c => {
      return {
        ...c,
        noOfMembers: Object.values(database.BoardMember.byId).filter(bm => bm.boardId === c.id).length,
      };
    }).filter(c => !c.refCode);
  }

  render() {
    const requests = this.getRequests();
    const classes = this.getClasses();
    // console.log('Props in classroom', this.props);
    return (
      <div className="pc-table-wrapper">
        <Header
          header="Class List"
          totalUser={classes.length}
          buttonText="Requests"
          popupContent={<ClassRequest requests={requests} props={this.props} />}
          popupTitle="Pending Requests"
          addButton
          badge
          badgeCount={requests.length}
        />
        {/* <Filter /> */}
        <ClassList classes={classes} props={this.props} />
      </div>
    );
  }
}

export default Classrooms;
Classrooms.propTypes = {
  setActiveHeader: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  orgObj: PropTypes.objectOf(PropTypes.any).isRequired,
};
