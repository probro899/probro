import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card } from '@blueprintjs/core';
import BioForm from './BioForm';
import { bioSchema } from '../structure';
import { ENDPOINT } from '../../../../config';

const UserPortal = ({ data, account, onClick }) => {
  return (
    <Card
      elevation={2}
      interactive
      onClick={() => onClick(data.id)}
      style={{ marginRight: 10, marginBottom: 10, display: 'flex', flexDirection: 'row', padding: '2px', position: 'relative' }}
    >
      {
        data.attachment && (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <img
              height={50}
              alt="portal identity"
              src={`${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${data.attachment}`}
            />
          </div>
        )
      }
      <div style={{ padding: '3px' }}>
        <span>
          <strong>{data.title}</strong>
        </span>
        <br />
        <span>{data.description}</span>
        <br />
      </div>
    </Card>
  );
};

UserPortal.propTypes = {
  onClick: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Bio extends React.Component {
  state = {
    bioEditPopover: false,
    portalOpen: null,
  };

  editBio = async (data) => {
    const {
      apis, account, updateDatabaseSchema, addDatabaseSchema, database,
    } = this.props;
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
    return { response: 200, message: res };
  }

  togglePopover = () => {
    const { bioEditPopover } = this.state;
    this.setState({
      bioEditPopover: !bioEditPopover,
      portalOpen: null,
    });
  }

  togglePortal = (val) => {
    this.setState({
      portalOpen: val,
      bioEditPopover: true,
    });
  }

  render() {
    const { bioEditPopover, portalOpen } = this.state;
    const {
      database, account, apis,
      deleteDatabaseSchema,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const bi = Object.values(database.UserDetail.byId).find(obj => account.user.id === obj.userId).bio;
    const portals = Object.values(database.UserPortal.byId).filter(obj => obj.userId === account.user.id);
    return (
      <div className="bio">
        <p className="bio-content">About</p>
        <div className="bio-info">
          {bi ? <p>{bi}</p> : <p style={{ color: '#696969' }}>No bio added</p>}
          <p className="edit">
            <Icon icon="edit" onClick={this.togglePopover} />
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '5px' }}>
          {portals.map(obj => <UserPortal onClick={this.togglePortal} account={account} key={obj.id} data={obj} />)}
        </div>
        <BioForm
          deleteDatabaseSchema={deleteDatabaseSchema}
          updateDatabaseSchema={updateDatabaseSchema}
          addDatabaseSchema={addDatabaseSchema}
          portalOpen={portalOpen}
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
