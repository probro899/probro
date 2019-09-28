import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import BioForm from './BioForm';
import { bioSchema } from '../structure';

class Bio extends React.Component {
  state = {
    bioEditPopover: false,
  };

  editBio = async (data) => {
    const { apis, account } = this.props;
    const res = await apis.updateUserDetails({
      userId: account.user.id,
      ...data,
    });
    // this.togglePopover();
    return { response: 200, message: res };
  }

  togglePopover = () => {
    const { bioEditPopover } = this.state;
    this.setState({
      bioEditPopover: !bioEditPopover,
    });
  }

  render() {
    const { bioEditPopover } = this.state;
    const { database, account, apis } = this.props;
    let bi;
    Object.values(database.UserDetail.byId).map((obj) => {
      if (account.user.id === obj.userId) {
        bi = obj.bio;
      }
    });
    // console.log(database);
    return (
      <div className="bio">
        <p className="bio-content">About</p>
        <div className="bio-info">
          <p>
            {bi ? <span>{bi}</span> : <span style={{ color: '#696969' }}>No bio added</span>}
          </p>
          <p className="edit">
            <Icon icon="edit" onClick={this.togglePopover} />
          </p>
        </div>
        <BioForm
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
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
};

export default Bio;
