import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const icon = require('../../../../assets/icons/64w/uploadicon64.png');

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
      <div className="i-result">
        <div className="img-con">
          <img
            alt="profile thumnail"
            src={icon}
          />
        </div>
        <div className="desc-con">
          <p className="name">
            <Link to={`/user/${user.id}/`}>
              {`${user.firstName} ${user.lastName}`}
            </Link>
          </p>
          <p>Software Engineer</p>
          <p className="location">Nepal</p>
        </div>
      </div>
    );
  }
}

Connecte.propTypes = {
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
};


export default Connecte;
