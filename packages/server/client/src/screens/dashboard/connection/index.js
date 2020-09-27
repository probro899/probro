import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import Connecte from './Connecte';
import client from '../../../socket';
import { Spinner } from '../../../common';

class Connection extends React.Component {
  constructor(props) {
    super(props);
    const { updateNav } = this.props;
    updateNav({
      schema: 'sideNav',
      data: { name: 'Connections' },
    });
    this.state = { apis: {} };
  }

  async componentDidMount() {
    const apis = await client.scope('Mentee');
    this.setState({ apis });
  }

  getConnections = () => {
    const { database, account } = this.props;
    const userId = account.user.id;
    const connectionIds = [];
    Object.values(database.UserConnection.byId).map((obj) => {
      connectionIds.push(obj.userId === userId ? { userId: obj.mId, connection: obj } : { userId: obj.userId, connection: obj });
    });
    return connectionIds;
  }

  render() {
    const {
      database,
      account,
      updateWebRtc,
      updateDatabaseSchema,
      deleteDatabaseSchema,
    } = this.props;
    console.log('UserConnection Data', this.props);
    const connectionIds = Object.values(database.UserConnection.byId);
    const { apis } = this.state;
    if (!account.user) {
      return (<div className="bro-right" style={{ position: 'relative' }}><Spinner /></div>);
    }
    return (
      <div className="connection bro-right">
        <div className="header">
          <div>
            <span className="title">Connections </span>
            <small>Mange your connections</small>
          </div>
        </div>
        <div className="con-list">
          {
            connectionIds.length === 0 && (
              <div className="pc-no-cons">
                <p>You do not have any connections at the moment.</p>
              </div>
            )
          }
          {
            connectionIds.map(con => (
              <Connecte
                updateWebRtc={updateWebRtc}
                deleteDatabaseSchema={deleteDatabaseSchema}
                updateDatabaseSchema={updateDatabaseSchema}
                apis={apis}
                key={con.id}
                account={account}
                database={database}
                {...con}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Connection.propTypes = {
  updateNav: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Connection);
