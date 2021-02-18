import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit } from "react-icons/md";
import BioForm from './BioForm';
import { bioSchema } from '../structure';

class Bio extends React.Component {
  state = {
    bioEditPopover: false,
  };

  editBio = async (data) => {
    const {
      apis, account, updateDatabaseSchema, addDatabaseSchema, database,
    } = this.props;
    try {
      const res = await apis.updateUserDetails({
        userId: account.user.id,
        ...data,
      });
      const userDetail = Object.values(database.UserDetail.byId).find(obj => obj.userId === account.user.id);
      if (userDetail) {
        updateDatabaseSchema('UserDetail', {
          id: userDetail.id,
          ...data,
        });
      } else {
        addDatabaseSchema('UserDetail', {
          id: res,
          ...data,
        });
      }
      return { response: 200, message: "Successfully Updated" };
    } catch {
      return { response: 400, message: "Server Error!!" };
    }
  }

  togglePopover = () => {
    const { bioEditPopover } = this.state;
    this.setState({
      bioEditPopover: !bioEditPopover,
    });
  }

  render() {
    const { bioEditPopover } = this.state;
    const {
      database, account, apis,
      deleteDatabaseSchema,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const bio = Object.values(database.UserDetail.byId).find(obj => account.user.id === obj.userId);
    return (
      <div className="bio">
        <p className="bio-content">About</p>
        <div className="bio-info">
          {bio ? <p>{bio.bio}</p> : <p style={{ color: '#696969' }}>No bio added</p>}
          <p className="edit" style={{ cursor: 'pointer' }}>
            <MdEdit onClick={this.togglePopover} size={20} />
          </p>
        </div>
        <BioForm
          deleteDatabaseSchema={deleteDatabaseSchema}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
          database={database}
          account={account}
          apis={apis}
          isOpen={bioEditPopover}
          structure={bioSchema}
          callback={this.editBio}
          onClose={() => this.togglePopover()}
        />
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
