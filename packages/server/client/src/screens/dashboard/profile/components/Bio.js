import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import BioForm from './BioForm';
import ReadMoreReadLess from '../../../../common/ReadMoreReadLess';
import Card from '../../../../common/Card';

class Bio extends React.Component {
  state = { bioEditPopover: false };

  editBio = async (data) => {
    const { apis, account, updateDatabaseSchema, addDatabaseSchema, database } = this.props;
    try {
      const res = await apis.updateUserDetails({ ...data, userId: account.user.id });
      const userDetail = Object.values(database.UserDetail.byId).find(obj => obj.userId === account.user.id);
      if (userDetail) {
        updateDatabaseSchema('UserDetail', { ...data, id: userDetail.id });
      } else {
        addDatabaseSchema('UserDetail', { ...data, id: res });
      }
      return { response: 200, message: "Successfully Updated" };
    } catch {
      return { response: 400, message: "Server Error!!" };
    }
  }

  togglePopover = () => this.setState({ bioEditPopover: !this.state.bioEditPopover });

  render() {
    const { bioEditPopover } = this.state;
    const { database, account } = this.props;
    const bio = Object.values(database.UserDetail.byId).find(obj => account.user.id === obj.userId);
    return (
      <div className="bio">
        <Card>
          <h2 className="bio-content">About</h2>
          <div className="bio-info">
            {bio ? <p><ReadMoreReadLess text={bio.bio} /></p> : <p style={{ color: '#696969' }}>No bio added</p>}
            <p className="edit" style={{ cursor: 'pointer' }}><MdEdit onClick={this.togglePopover} size={20} /></p>
          </div>
          <BioForm
            bio={bio ? bio.bio : ''}
            isOpen={bioEditPopover}
            callback={this.editBio}
            onClose={() => this.togglePopover()}
          />
        </Card>
      </div>
    );
  }
}

Bio.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default Bio;
