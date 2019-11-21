import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card } from '@blueprintjs/core';
import BioForm from './BioForm';
import { bioSchema } from '../structure';
import { ENDPOINT } from '../../../../config';

const UserPortal = ({ data, account }) => {
  return (
    <Card
      elevation={2}
      interactive
      style={{ display: 'flex', flexDirection: 'row', padding: '2px', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Icon icon="cross" intent="default" />
      </div>
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <img
          alt="portal identity"
          height="50px"
          src={`${ENDPOINT}/user/${10000000 + parseInt(account.user.id, 10)}/profile/${data.attachment}`}
        />
      </div>
      <div style={{ padding: '3px' }}>
        <span>
          <strong>{data.title}</strong>
        </span>
        <br />
        <span>{data.description}</span>
        <br />
        <span>{data.link}</span>
        <br />
      </div>
    </Card>
  );
};

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
    const portals = [];
    Object.values(database.UserPortal.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        portals.push(obj);
      }
    });
    return (
      <div className="bio">
        <p className="bio-content">About</p>
        <div className="bio-info">
          {bi ? <p>{bi}</p> : <p style={{ color: '#696969' }}>No bio added</p>}
          <p className="edit">
            <Icon icon="edit" onClick={this.togglePopover} />
          </p>
        </div>
        <div style={{ display: 'flex', padding: '5px' }}>
          {portals.map(obj => <UserPortal account={account} key={obj.id} data={obj} />)}
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
};

export default Bio;
