import React from 'react';
import PropTypes from 'prop-types';

class Connecte extends React.Component {
  state = {};

  render() {
    const { id, database } = this.props;
    const user = database.User.byId[id];
    let userDetail;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (id === obj.userId) {
        userDetail = obj;
      }
    });
    return (
      <div>
        Helllo Connectee
        <p>{id}</p>
        <p>{user.firstName}</p>
      </div>
    );
  }
}

Connecte.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
};


export default Connecte;
