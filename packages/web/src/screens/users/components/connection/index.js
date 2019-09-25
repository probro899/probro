import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../../actions';
import Connecte from './Connecte';

class Connection extends React.Component {
  state = {};

  async componentWillMount() {
    const { updateNav } = this.props;
    updateNav({
      schema: 'sideNav',
      data: { name: 'Connections' },
    });
  }

  getConnections = () => {
    const { database, account } = this.props;
    const userId = account.user.id;
    const connectionIds = [];
    Object.values(database.UserConnection.byId).map((obj) => {
      connectionIds.push(obj.userId === userId ? obj.mId : obj.userId);
    });
    return connectionIds;
  }

  render() {
    const { database, account } = this.props;
    if (!account.user) {
      return <div />;
    }
    // console.log('connection', database, account);
    const connectionIds = this.getConnections();
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
            connectionIds.map(id => <Connecte key={id} id={id} database={database} />)
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Connection);
